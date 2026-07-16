/* ---- subjects/rooms: 필터 목록에 쓸 값들을 자동으로 뽑아냄 ----
   rooms는 EQUIPMENT 안의 room 값들을 중복 제거해서 자동 생성하므로,
   위 데이터에 새로운 실험실 이름을 쓰면 필터에 자동으로 추가됨 */
const subjects = ["물리","화학","지구","생명","기타"];
const rooms = [...new Set(EQUIPMENT.map(e=>e.room))];

/* ---- 현재 화면 상태를 기억하는 변수들 ----
   (검색어, 선택된 필터, 정렬 기준, 현재 페이지 등 — 이 값들이 바뀔 때마다 render()를 다시 호출함) */
let activeSubjects = new Set();   // 현재 체크된 과목 필터 (비어있으면 = 전체)
let activeRooms = new Set();      // 현재 선택된 실험실 필터 (비어있으면 = 전체)
let query = "";                   // 검색창에 입력된 검색어
let sortKey = "name";             // 현재 정렬 기준: "name" | "subject" | "room"
let sortDir = 1;                  // 정렬 방향: 1=오름차순(↑), -1=내림차순(↓)
const PAGE_SIZE = 25;             // 한 페이지에 보여줄 기자재 개수
let currentPage = 1;              // 현재 페이지 번호

/* ---- 필터 모달 안의 "과목/실험실" 버튼(pill)들을 만들고, 클릭 동작을 연결하는 함수 ----
   페이지가 처음 열릴 때 한 번만 실행됨 (맨 아래 buildPills(); 호출 부분 참고) */
function buildPills(){
  const subWrap = document.getElementById("subjectPills");
  subWrap.innerHTML = ['전체', ...subjects].map(s=>`<div class="pill" data-group="subject" data-value="${s}">${s}</div>`).join("");
  const roomWrap = document.getElementById("roomPills");
  roomWrap.innerHTML = ['전체', ...rooms].map(r=>`<div class="pill" data-group="room" data-value="${r}">${r}</div>`).join("");

  // 과목: 다중 선택 가능(체크박스 방식), "전체"를 누르면 초기화
  // 실험실: 단일 선택(라디오 방식)
  document.querySelectorAll('.pill[data-group="subject"]').forEach(p=>{
    p.addEventListener("click", ()=>{
      const isAll = p.dataset.value === '전체';
      if(isAll){
        document.querySelectorAll('.pill[data-group="subject"]').forEach(sib=>sib.classList.remove("selected"));
        p.classList.add("selected");
      }else{
        document.querySelector('.pill[data-group="subject"][data-value="전체"]').classList.remove("selected");
        p.classList.toggle("selected");
        const anySelected = document.querySelector('.pill[data-group="subject"].selected');
        if(!anySelected){
          document.querySelector('.pill[data-group="subject"][data-value="전체"]').classList.add("selected");
        }
      }
    });
  });
  document.querySelectorAll('.pill[data-group="room"]').forEach(p=>{
    p.addEventListener("click", ()=>{
      document.querySelectorAll('.pill[data-group="room"]').forEach(sib=>sib.classList.remove("selected"));
      p.classList.add("selected");
    });
  });
  // 기본값: 각 그룹의 "전체" 선택
  document.querySelector('.pill[data-group="subject"][data-value="전체"]').classList.add("selected");
  document.querySelector('.pill[data-group="room"][data-value="전체"]').classList.add("selected");
}

/* ---- 검색어가 이름/설명/태그 중 하나라도 포함되어 있으면 true 반환 ---- */
function matchesQuery(item, q){
  if(!q) return true;
  const hay = (item.name + " " + item.desc + " " + item.tags.join(" ")).toLowerCase();
  return hay.includes(q.toLowerCase());
}

/* ---- 현재 상태(검색어/필터/정렬)를 모두 반영해서 최종 리스트를 만드는 핵심 함수 ----
   1) EQUIPMENT 전체에서 과목/실험실 필터와 검색어 조건에 맞는 것만 골라내고(filter)
   2) 골라낸 것들을 현재 정렬 기준(sortKey)과 방향(sortDir)에 맞게 정렬(sort)
   이 함수의 결과가 render()에서 화면에 그려짐 */
function getFiltered(){
  let list = EQUIPMENT.filter(e=>{
    const okSubject = activeSubjects.size===0 || activeSubjects.has(e.subject);
    const okRoom = activeRooms.size===0 || activeRooms.has(e.room);
    return okSubject && okRoom && matchesQuery(e, query);
  });
  list.sort((a,b)=>{
    let r = a[sortKey].localeCompare(b[sortKey], 'ko');
    return r * sortDir;
  });
  return list;
}

/* ============================================================
   ★ render(): 화면을 다시 그리는 가장 핵심적인 함수 ★
   검색어 입력, 필터 변경, 정렬 변경, 페이지 이동이 있을 때마다 이 함수가 호출됨
   흐름: getFiltered()로 데이터 준비 → 현재 페이지 분량만 잘라내기(slice)
        → 기자재 하나당 리스트 행(div.list-row) 하나씩 HTML로 만들어서 화면에 삽입
   ============================================================ */
function render(){
  const filtered = getFiltered();
  const listWrap = document.getElementById("listWrap");
  const emptyMsg = document.getElementById("emptyMsg");

  // 페이지네이션 계산: 전체 결과를 PAGE_SIZE(50)개씩 나눠서 현재 페이지 것만 추출
  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  if(currentPage > totalPages) currentPage = totalPages;
  if(currentPage < 1) currentPage = 1;
  const pageItems = filtered.slice((currentPage-1)*PAGE_SIZE, currentPage*PAGE_SIZE);

  listWrap.innerHTML = "";
  emptyMsg.style.display = filtered.length ? "none" : "block";

  // 기자재 1개 = 리스트 행(row) 1개. photo 필드가 있으면 실제 사진을, 없으면
  // "사진 준비중" placeholder를 보여줌. 행을 클릭하면 상세 모달이 열림
  pageItems.forEach(item=>{
    const row = document.createElement("div");
    row.className = "list-row";
    row.dataset.subject = item.subject;
    row.innerHTML = `
      <div class="thumb-wrap">
        <div class="subject-chip"></div>
        ${item.photo
          ? `<img class="thumb" src="${item.photo}" alt="${item.name}">`
          : `<div class="thumb">사진<br>준비중</div>`}
      </div>
      <div class="row-body">
        <div class="row-desc">${item.desc}</div>
        <div class="row-name">${item.name}</div>
        <div class="row-tags">
          <span class="row-tag"><span class="tag-key">과목</span><span class="tag-val">${item.subject}</span></span>
          <span class="row-tag"><span class="tag-key">실험실</span><span class="tag-val">${item.room}</span></span>
        </div>
      </div>`;
    row.addEventListener("click", ()=>openDetail(item));
    listWrap.appendChild(row);
  });

  // 상단의 "전체 N · 표시 N" 숫자 갱신
  document.getElementById("shownCount").textContent = filtered.length;
  document.getElementById("totalCount").textContent = EQUIPMENT.length;
  renderChips();               // 적용된 필터 칩 다시 그리기
  renderPagination(totalPages); // 페이지 번호 버튼 다시 그리기
}

/* ---- 페이지 번호를 바꾸고 다시 렌더링 + 리스트 맨 위로 스크롤 ---- */
function goToPage(p){
  currentPage = p;
  render();
  document.getElementById("labMain").scrollIntoView({behavior:"smooth", block:"start"});
}

/* ---- 하단 페이지 번호 버튼들(<, 1, 2, 3..., >)을 그리는 함수 ----
   전체가 1페이지뿐이면(totalPages<=1) 아무것도 안 그림 (버튼 자체가 안 보임) */
function renderPagination(totalPages){
  const wrap = document.getElementById("paginationWrap");
  wrap.innerHTML = "";
  if(totalPages <= 1) return;

  const prevBtn = document.createElement("button");
  prevBtn.className = "page-btn";
  prevBtn.textContent = "<";
  prevBtn.disabled = currentPage === 1;
  prevBtn.addEventListener("click", ()=> goToPage(currentPage-1));
  wrap.appendChild(prevBtn);

  for(let p=1; p<=totalPages; p++){
    const btn = document.createElement("button");
    btn.className = "page-btn" + (p===currentPage ? " active" : "");
    btn.textContent = p;
    btn.addEventListener("click", ()=> goToPage(p));
    wrap.appendChild(btn);
  }

  const nextBtn = document.createElement("button");
  nextBtn.className = "page-btn";
  nextBtn.textContent = ">";
  nextBtn.disabled = currentPage === totalPages;
  nextBtn.addEventListener("click", ()=> goToPage(currentPage+1));
  wrap.appendChild(nextBtn);
}

/* ---- 검색창 아래 "선택된 필터" 칩(chip)들을 그리는 함수 ----
   각 칩의 ✕ 버튼을 누르면 해당 필터만 해제하고 다시 렌더링함 */
function renderChips(){
  const chipsWrap = document.getElementById("activeChips");
  const chips = [];
  activeSubjects.forEach(s=>chips.push({type:"subject", value:s}));
  activeRooms.forEach(r=>chips.push({type:"room", value:r}));

  if(chips.length===0){ chipsWrap.innerHTML=""; }
  else{
    chipsWrap.innerHTML = chips.map(c=>
      `<span class="chip">${c.value}<button data-type="${c.type}" data-value="${c.value}">✕</button></span>`
    ).join("") + `<button class="chip-reset" id="chipResetBtn">전체 초기화</button>`;

    chipsWrap.querySelectorAll("button[data-type]").forEach(btn=>{
      btn.addEventListener("click", ()=>{
        const type = btn.dataset.type, value = btn.dataset.value;
        if(type==="subject") activeSubjects.delete(value);
        else activeRooms.delete(value);
        syncPills();
        render();
      });
    });
    document.getElementById("chipResetBtn").addEventListener("click", ()=>{
      activeSubjects.clear(); activeRooms.clear();
      syncPills();
      render();
    });
  }

  const badge = document.getElementById("filterBadge");
  const total = activeSubjects.size + activeRooms.size;
  badge.style.display = total>0 ? "flex" : "none";
  badge.textContent = total;
}

/* ---- 칩을 지웠을 때, 필터 모달 안의 버튼(pill) 선택 상태도 함께 맞춰주는 함수 ----
   (칩과 모달 버튼, 두 군데의 "선택됨" 표시가 서로 어긋나지 않도록 동기화) */
function syncPills(){
  document.querySelectorAll('.pill[data-group="subject"]').forEach(p=>{
    const isAll = p.dataset.value === '전체';
    const shouldSelect = activeSubjects.size===0 ? isAll : activeSubjects.has(p.dataset.value);
    p.classList.toggle("selected", shouldSelect);
  });
  document.querySelectorAll('.pill[data-group="room"]').forEach(p=>{
    const isAll = p.dataset.value === '전체';
    const shouldSelect = activeRooms.size===0 ? isAll : activeRooms.has(p.dataset.value);
    p.classList.toggle("selected", shouldSelect);
  });
}

/* ---- 정렬 탭 클릭 처리 ----
   같은 탭을 다시 누르면 방향(오름↔내림)만 뒤집고,
   다른 탭을 누르면 그 기준으로 바꾸고 오름차순부터 시작함 */
document.getElementById("sortRow").addEventListener("click", (e)=>{
  const btn = e.target.closest(".sort-tab");
  if(!btn) return;
  const key = btn.dataset.key;
  if(sortKey === key){
    sortDir *= -1;
  }else{
    sortKey = key; sortDir = 1;
  }
  document.querySelectorAll(".sort-tab").forEach(t=>{
    t.classList.remove("active");
    t.innerHTML = t.textContent.replace(/[↑↓]/g,"").trim();
  });
  btn.classList.add("active");
  btn.innerHTML = btn.textContent.trim() + ` <span class="arrow">${sortDir===1?'↑':'↓'}</span>`;
  currentPage = 1;
  render();
});

/* ---- 필터 모달 열기/닫기 + 적용/초기화 버튼 동작 ---- */
const modalOverlay = document.getElementById("modalOverlay");
document.getElementById("openFilterBtn").addEventListener("click", ()=> modalOverlay.classList.add("open"));
document.getElementById("closeFilterBtn").addEventListener("click", ()=> modalOverlay.classList.remove("open"));
modalOverlay.addEventListener("click", e=>{ if(e.target===modalOverlay) modalOverlay.classList.remove("open"); }); // 배경 클릭시 닫기

// "적용하기": 모달 안에서 선택된 pill들을 실제 필터 상태(activeSubjects/activeRooms)로 반영
document.getElementById("applyFilterBtn").addEventListener("click", ()=>{
  const subSels = [...document.querySelectorAll('.pill[data-group="subject"].selected')].map(p=>p.dataset.value);
  const roomSel = document.querySelector('.pill[data-group="room"].selected');
  activeSubjects = new Set(subSels.filter(v=>v !== '전체'));
  activeRooms = (roomSel && roomSel.dataset.value !== '전체') ? new Set([roomSel.dataset.value]) : new Set();
  currentPage = 1;
  render();
  modalOverlay.classList.remove("open");
});
// "전체 초기화": 모달 안의 선택 상태만 초기화 (적용하기 눌러야 실제 반영됨)
document.getElementById("resetFilterBtn").addEventListener("click", ()=>{
  document.querySelectorAll(".pill").forEach(p=>p.classList.remove("selected"));
  document.querySelector('.pill[data-group="subject"][data-value="전체"]').classList.add("selected");
  document.querySelector('.pill[data-group="room"][data-value="전체"]').classList.add("selected");
});

/* ---- 검색창 입력 처리 ---- */
const searchInput = document.getElementById("searchInput");
const clearBtn = document.getElementById("clearBtn");
searchInput.addEventListener("input", e=>{
  query = e.target.value.trim();
  clearBtn.classList.toggle("show", query.length>0);
  currentPage = 1;
  render();
});
clearBtn.addEventListener("click", ()=>{
  searchInput.value=""; query=""; clearBtn.classList.remove("show"); currentPage = 1; render();
});

/* ---- 상세 모달 ----
   리스트 행을 클릭하면(render() 안의 row.addEventListener) 이 함수가 호출되어
   클릭한 기자재(item)의 정보로 detailModal의 내용을 채우고 모달을 띄움 */
const detailOverlay = document.getElementById("detailOverlay");
function openDetail(item){
  document.getElementById("detailModal").innerHTML = `
    <div class="detail-head">
      <div>
        <div class="detail-tag">${item.subject} · ${item.room}</div>
        <div class="detail-title">${item.name}</div>
      </div>
      <button class="detail-close" onclick="document.getElementById('detailOverlay').classList.remove('open')">✕</button>
    </div>
    <div class="detail-body">
      ${item.photo
        ? `<img class="detail-thumb" src="${item.photo}" alt="${item.name}">`
        : `<div class="detail-thumb">사진 준비 중</div>`}
      <div class="detail-section">
        <div class="detail-label">설명</div>
        <div class="detail-text">${item.desc}</div>
      </div>
      <div class="detail-section">
        <div class="detail-label">사용법 / 주의사항</div>
        <div class="detail-text">${item.usage}</div>
      </div>
      <div class="detail-section">
        <div class="detail-label">관련 실험 태그</div>
        <div class="tag-pills">${item.tags.map(t=>`<span class="tag-pill">#${t}</span>`).join("")}</div>
      </div>
      <div class="detail-section">
        <div class="detail-label">세부 위치</div>
        <div class="detail-text">${item.location}</div>
      </div>
    </div>`;
  detailOverlay.classList.add("open");
}
detailOverlay.addEventListener("click", e=>{ if(e.target===detailOverlay) detailOverlay.classList.remove("open"); }); // 배경 클릭시 닫기

/* ---- 고정 상단바(app-topbar) 높이만큼 아래 요소들을 밀어내는 함수 ----
   app-topbar는 position:fixed라서 원래 자리(문서 흐름)에 공간을 안 차지하기 때문에,
   그 높이만큼 topSpacer의 높이를 강제로 맞춰주고, topbar가 sticky로 붙을 위치(top)도 같이 계산함.
   화면 크기가 바뀔 수도 있어서 resize 이벤트에도 다시 계산하도록 연결해둠 */
function syncTopbarOffset(){
  const h = document.getElementById("appTopbar").offsetHeight;
  document.getElementById("topSpacer").style.height = h + "px";
  document.getElementById("topbar").style.top = h + "px";
}
window.addEventListener("resize", syncTopbarOffset);
syncTopbarOffset(); // 페이지 로드 시 1회 즉시 실행

/* ---- 하단 고정 탭 "실험기구" / "지도" 전환 ----
   실험기구 탭 → labControls(검색/필터/정렬) + labMain(리스트) 보이기, mapSection 숨기기
   지도 탭     → 반대로 labControls/labMain 숨기고 mapSection 보이기 */
document.querySelectorAll(".switch-tab").forEach(tab=>{
  tab.addEventListener("click", ()=>{
    document.querySelectorAll(".switch-tab").forEach(t=>t.classList.remove("active"));
    tab.classList.add("active");
    const section = tab.dataset.section;
    document.getElementById("labControls").style.display = section === "lab" ? "" : "none";
    document.getElementById("labMain").style.display = section === "lab" ? "" : "none";
    document.getElementById("mapSection").style.display = section === "map" ? "" : "none";
  });
});

/* ---- 페이지가 처음 열릴 때 딱 한 번 실행되는 초기화 코드 ----
   buildPills(): 필터 모달 안의 버튼들을 만듦
   render()    : 첫 화면(기자재 리스트)을 그림 */
buildPills();
render();

