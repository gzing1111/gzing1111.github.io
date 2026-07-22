const subjects = ["물리","화학","지구","생명","기타"];
const rooms = [...new Set(EQUIPMENT.map(e=>e.room))];


let activeSubjects = new Set();   
let activeRooms = new Set();      
let query = "";                   
let sortKey = "name";             
let sortDir = 1;                  
const PAGE_SIZE = 25;             
let currentPage = 1;              


function buildPills(){
  const subWrap = document.getElementById("subjectPills");
  subWrap.innerHTML = ['전체', ...subjects].map(s=>`<div class="pill" data-group="subject" data-value="${s}">${s}</div>`).join("");
  const roomWrap = document.getElementById("roomPills");
  roomWrap.innerHTML = ['전체', ...rooms].map(r=>`<div class="pill" data-group="room" data-value="${r}">${r}</div>`).join("");

  // 과목: check box, "전체"를 누르면 초기화
  // 실험실: radio button
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
  // 기본값: "전체"
  document.querySelector('.pill[data-group="subject"][data-value="전체"]').classList.add("selected");
  document.querySelector('.pill[data-group="room"][data-value="전체"]').classList.add("selected");
}

// 검색어가 이름/설명/태그 중 하나라도 포함되어 있으면 true 반환 
function matchesQuery(item, q){
  if(!q) return true;
  const hay = (item.name + " " + item.desc + " " + item.tags.join(" ")).toLowerCase();
  return hay.includes(q.toLowerCase());
}


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


function render(){
  const filtered = getFiltered();
  const listWrap = document.getElementById("listWrap");
  const emptyMsg = document.getElementById("emptyMsg");

  // 페이지네이션 계산
  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  if(currentPage > totalPages) currentPage = totalPages;
  if(currentPage < 1) currentPage = 1;
  const pageItems = filtered.slice((currentPage-1)*PAGE_SIZE, currentPage*PAGE_SIZE);

  listWrap.innerHTML = "";
  emptyMsg.style.display = filtered.length ? "none" : "block";

  // 기자재 1개 = 리스트 행(row) 1개. photo 필드가 있으면 실제 사진. 없으면 "사진 준비중"
  // 행 클릭 시 상세 모달 열림
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

  // 상단의 "전체 N · 표시 N" 숫자
  document.getElementById("shownCount").textContent = filtered.length;
  document.getElementById("totalCount").textContent = EQUIPMENT.length;
  renderChips();               
  renderPagination(totalPages); 
}

function goToPage(p){
  currentPage = p;
  render();
  document.getElementById("labMain").scrollIntoView({behavior:"smooth", block:"start"});
}

// 페이지 번호 버튼
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

//검색창 아래 선택한 필터 칩
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

// 칩 삭제와 필터 모달 동기화
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

// 정렬 탭 클릭
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

// 필터 모달
const modalOverlay = document.getElementById("modalOverlay");
document.getElementById("openFilterBtn").addEventListener("click", ()=> modalOverlay.classList.add("open"));
document.getElementById("closeFilterBtn").addEventListener("click", ()=> modalOverlay.classList.remove("open"));
modalOverlay.addEventListener("click", e=>{ if(e.target===modalOverlay) modalOverlay.classList.remove("open"); }); // 배경 클릭시 닫기

document.getElementById("applyFilterBtn").addEventListener("click", ()=>{
  const subSels = [...document.querySelectorAll('.pill[data-group="subject"].selected')].map(p=>p.dataset.value);
  const roomSel = document.querySelector('.pill[data-group="room"].selected');
  activeSubjects = new Set(subSels.filter(v=>v !== '전체'));
  activeRooms = (roomSel && roomSel.dataset.value !== '전체') ? new Set([roomSel.dataset.value]) : new Set();
  currentPage = 1;
  render();
  modalOverlay.classList.remove("open");
});
// 전체 초기화
document.getElementById("resetFilterBtn").addEventListener("click", ()=>{
  document.querySelectorAll(".pill").forEach(p=>p.classList.remove("selected"));
  document.querySelector('.pill[data-group="subject"][data-value="전체"]').classList.add("selected");
  document.querySelector('.pill[data-group="room"][data-value="전체"]').classList.add("selected");
});

// 검색창 
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

// 상세 모달
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

// topbar 높이랑 맞추기
function syncTopbarOffset(){
  const h = document.getElementById("appTopbar").offsetHeight;
  document.getElementById("topSpacer").style.height = h + "px";
  document.getElementById("topbar").style.top = h + "px";
}
window.addEventListener("resize", syncTopbarOffset);
syncTopbarOffset(); // 페이지 로드 시 1회 즉시 실행

// bottombar 탭 "실험기구" / "지도" 전환
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

// 실행 시 초기화 코드
buildPills();
render();

