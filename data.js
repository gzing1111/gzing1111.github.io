/*  ============================================================
     기구 데이터(카탈)
     subject : 과목 분류 ("물리" | "화학" | "지구" | "생명" | "기타" 중 1)
     room    : 위치 실험실(물지실 | 화학실)
     name    : 실험기구 이름 
     desc    : 한 줄 설명 (이름 위에 회색 글씨로 표시)
     상세모달
     tags    : 관련 실험/키워드 배열 해시태그
     usage   : 사용법/주의사항
     stock   : 수량. 현재는 뺌
     location: 세부 보관 위치
     photo   : 넣지 않으면 자동으로 "사진 준비중" placeholder가 표시
   ============================================================ */
const EQUIPMENT = [

   
   {subject:"기타", room:"물지실", name:"아두이노", desc:"센서 입력과 프로그래밍으로 다양한 장치를 제어하는 마이크로컨트롤러 보드",
      tags:["센서제어","오픈소스하드웨어"], usage:"USB로 컴퓨터와 연결 후 코드를 업로드하여 사용하며, 전원 연결 시 극성에 주의합니다.", location:"물지실 10번"
   , photo:"images/10arduino.jpg"},

   {subject:"물리", room:"물지실", name:"슬라이드 저항기", desc:"저항 슬라이더를 이동시켜 회로의 저항값을 연속적으로 조절하는 장치",
      tags:["옴의 법칙","전기회로"], usage:"슬라이더를 서서히 이동시켜 저항을 조절하며, 과전류가 흐르지 않도록 회로를 미리 점검합니다.", location:"물지실 10번"
   , photo:"images/10slidejeohanggi.jpg"},

   {subject:"지구", room:"물지실", name:"나침반", desc:"자침이 지구 자기장 방향을 가리켜 방위를 측정하는 도구",
      tags:["지구자기장","방위측정"], usage:"수평면에 놓고 자침이 안정될 때까지 기다린 후 방향을 읽으며, 주변 금속이나 자석을 멀리합니다.", location:"물지실 10번"
   , photo:"images/10nachimban.jpg"},

   {subject:"물리", room:"물지실", name:"막대자석", desc:"자기장을 발생시켜 자기력선과 자기 상호작용을 관찰하는 실험용 자석",
      tags:["자기장","자기력선"], usage:"철가루나 나침반으로 자기력선 분포를 관찰하며, 전자기기 근처에서는 사용을 피합니다.", location:"물지실 8번, 물지실 10번"
   , photo:"images/10makdaejasuk.jfif"},

   {subject:"물리", room:"물지실", name:"소리굽쇠", desc:"일정한 진동수의 음파를 발생시켜 소리의 파동 성질을 관찰하는 기구",
      tags:["공명","파동실험"], usage:"고무망치로 가볍게 쳐서 진동시키며, 금속 등 단단한 물체로 직접 두드리지 않습니다.", location:"물지실 10번"
   , photo:"images/10sorigubse.jpg"},

   {subject:"물리", room:"물지실", name:"직류 안정화 전원장치", desc:"일정한 전압과 전류를 안정적으로 공급하는 실험용 전원 공급 장치",
      tags:["전기회로","전압전류측정"], usage:"전압과 전류 값을 확인 후 회로에 연결하며, 사용 전 전원을 끈 상태에서 배선합니다.", location:"물지실 10번"
   , photo:"images/10jikryuanjeonghwa.png"},

   {subject:"지구", room:"물지실", name:"건습계", desc:"건구와 습구 온도차를 이용해 상대습도를 측정하는 기상 관측 기구",
      tags:["상대습도","기상관측"], usage:"습구의 거즈를 물에 적신 후 일정 시간 기다려 두 온도를 비교하여 습도표에서 값을 확인합니다.", location:"물지실 10번"
   , photo:"images/10gyeonsubgye.jpg"},

   {subject:"화학", room:"물지실", name:"볼타전지", desc:"두 금속과 전해질 용액의 산화환원 반응으로 전류를 발생시키는 화학 전지",
      tags:["산화환원반응","화학전지"], usage:"금속판과 전해질 용액을 준비해 연결하며, 실험 후 금속판을 깨끗이 세척합니다.", location:"물지실 10번"
   , photo:"images/10viltajubge.jpg"},

   {subject:"기타", room:"물지실", name:"AAA 건전지", desc:"소형 전자기기나 실험 회로에 전원을 공급하는 소형 건전지",
      tags:["전원공급","전지실험"], usage:"극성(+/-)을 확인하여 연결하며, 방전된 건전지는 분리 배출합니다.", location:"물지실 10번"
   , photo:"images/10aaagunjunge.jpg"},
   
   {subject:"지구", room:"물지실", name:"아두이노 미세먼지 측정센서", desc:"미세먼지 농도를 실시간으로 측정하는 센서 모듈",
      tags:["대기오염","환경측정"], usage:"센서를 아두이노에 연결 후 코드를 업로드하여 측정하며, 먼지가 쌓이지 않도록 보관에 유의합니다.", location:"물지실 9번"
   , photo:"images/9misaemunge.jpg"},

   {subject:"물리", room:"물지실", name:"진공펌프", desc:"용기 내부의 공기를 빼내어 진공 상태를 만드는 실험 기구",
      tags:["기압실험","진공실험"], usage:"밀폐 용기에 연결 후 서서히 공기를 배출하며, 유리 용기 사용 시 파손에 주의합니다.", location:"물지실 9번"
   , photo:"images/9jingongpump.jfif"},

   {subject:"지구", room:"물지실", name:"디지털 풍향풍속계", desc:"바람의 방향과 속도를 디지털로 측정하는 기상 관측 기구",
      tags:["기상관측","풍속측정"], usage:"바람이 잘 통하는 실외나 개방된 공간에서 측정하며, 센서부를 손으로 막지 않습니다.", location:"물지실 9번"
   , photo:"images/9digitalpung.jpg"},

   {subject:"물리", room:"물지실", name:"2차원 충돌 실험기", desc:"평면 위에서 두 물체의 충돌 전후 운동량과 에너지 변화를 관찰하는 실험 기구",
      tags:["운동량보존","충돌실험"], usage:"수평을 맞춘 후 물체를 발사하여 충돌 궤적을 기록하며, 충돌 전 장치 수평 상태를 확인합니다.", location:"물지실 9번"
   , photo:"images/9-2chawonchoongdol.jpg"},

   {subject:"물리", room:"물지실", name:"역학용 금속추", desc:"질량이 일정한 금속 추로 힘·운동·중력 관련 실험에 사용하는 기구",
      tags:["힘과운동","중력가속도"], usage:"용도에 맞는 질량의 추를 선택해 걸며, 낙하 실험 시 아래에 안전하게 받침을 둡니다.", location:"물지실 9번, 그외"
   , photo:"images/9yeokhakyonggumsokchu.jpg"},

   {subject:"물리", room:"물지실", name:"역학용 수레", desc:"마찰이 적은 트랙 위에서 등속·가속 운동을 관찰하는 실험용 수레",
      tags:["뉴턴운동법칙","등가속도운동"], usage:"트랙 위에 올려 힘을 가하며 이동시키고, 실험 전 바퀴와 트랙의 먼지를 제거합니다.", location:"물지실 9번"
   , photo:"images/9yeokhakyongsurae.jpg"},

   {subject:"물리", room:"물지실", name:"수면파 실험장치", desc:"물결파를 발생시켜 파동의 반사·굴절·간섭을 관찰하는 실험 기구",
      tags:["파동간섭","반사굴절"], usage:"수조에 적당량의 물을 채운 후 파동 발생기를 작동시키며, 물이 넘치지 않도록 주의합니다.", location:"물지실 9번"
   , photo:"images/9sumyeonpa.jpg"},

   {subject:"물리", room:"물지실", name:"용수철저울", desc:"탄성력·훅의 법칙 실험용 스프링 저울",
      tags:["훅의 법칙","탄성계수"], usage:"저울을 수직으로 고정 후 추를 걸어 변위를 측정합니다.", location:"물지실 9번"
   , photo:"images/9yongsucheoljeowool.jpg"},

   {subject:"물리", room:"물지실", name:"동시낙하장치", desc:"질량이 다른 두 물체를 동시에 낙하시켜 자유낙하 운동을 비교하는 실험 기구",
      tags:["자유낙하","중력가속도"], usage:"두 물체를 같은 높이에 고정 후 동시에 낙하시키며, 낙하 지점 아래 안전 매트를 둡니다.", location:"물지실 9번"
   , photo:"images/9dongsinakha.jpg"},

   {subject:"지구", room:"물지실", name:"복각방위계", desc:"지구 자기장의 복각과 방위각을 측정하는 지자기 관측 기구",
      tags:["지구자기장","복각측정"], usage:"수평을 맞춘 후 자침의 기울기와 방향을 읽으며, 주변 금속 물체를 멀리합니다.", location:"물지실 9번"
   , photo:"images/9bokgakbanwigye.jpg"},

   {subject:"지구", room:"물지실", name:"암석 표본 핸드북", desc:"다양한 암석 표본을 관찰·분류하며 암석의 특징을 학습하는 교구",
      tags:["암석분류","광물관찰"], usage:"표본의 색·조직·광택 등을 관찰하여 분류하며, 표본을 떨어뜨리지 않도록 조심히 다룹니다.", location:"물지실 9번"
   , photo:"images/9amsukpyobonhandbook.jpg"},

   {subject:"지구", room:"물지실", name:"태양관측경", desc:"태양을 안전하게 관측하여 흑점 등 표면 현상을 관찰하는 천체 관측 기구",
      tags:["태양흑점","천체관측"], usage:"반드시 전용 태양 필터를 장착한 후 관측하며, 필터 없이 절대 직접 태양을 보지 않습니다.", location:"물지실 9번"
   , photo:"images/9taeyangguanchuk.png"},

   {subject:"물리", room:"물지실", name:"금속박 검전기", desc:"대전된 물체의 전하 유무와 종류를 금속박의 벌어짐으로 확인하는 정전기 실험 기구",
   tags:["정전기유도","전하량비교"], usage:"대전체를 검전기 상단에 가까이 하여 금속박이 벌어지는 정도를 관찰하며, 습도가 높은 날은 오작동에 유의합니다.", location:"물지실 8번"
, photo:"images/8gumsokbakgunjungi.jpg"},

{subject:"물리", room:"물지실", name:"선스펙트럼 광원장치", desc:"특정 기체를 방전시켜 고유한 선스펙트럼을 발생시키는 광원 장치",
   tags:["선스펙트럼","방출스펙트럼"], usage:"전원을 켠 후 분광기와 함께 사용하여 스펙트럼을 관찰하며, 고전압 부위는 직접 만지지 않습니다.", location:"물지실 8번"
, photo:"images/8sunspectramgwanwon.jpg"},

{subject:"물리", room:"물지실", name:"분광기", desc:"빛을 파장별로 분산시켜 스펙트럼을 관찰하는 광학 기구",
   tags:["빛의분산","스펙트럼분석"], usage:"광원을 향해 조준한 후 접안부로 스펙트럼을 관찰하며, 렌즈 표면을 손으로 만지지 않습니다.", location:"물지실 8번"
, photo:"images/8bungwanggi.png"},


{subject:"물리", room:"물지실", name:"니크롬선 저항", desc:"일정한 저항값을 가지는 니크롬선으로 전기저항 실험에 사용하는 기구",
   tags:["전기저항","옴의법칙"], usage:"회로에 연결하여 전압·전류를 측정하며, 장시간 전류 통과 시 발열에 주의합니다.", location:"물지실 8번"
, photo:"images/8nichromesunjeohang.jpg"},

{subject:"물리", room:"물지실", name:"검류계", desc:"미세한 전류의 흐름과 방향을 감지하는 전류 측정 기구",
   tags:["전류측정","전자기유도"], usage:"회로에 직렬로 연결하여 바늘의 움직임을 관찰하며, 과전류가 흐르지 않도록 주의합니다.", location:"물지실 8번"
, photo:"images/8gumryugye.jfif"},


{subject:"물리", room:"물지실", name:"원형코일", desc:"전류가 흐를 때 자기장을 형성하여 전자기유도 실험에 사용하는 코일",
   tags:["전자기유도","앙페르법칙"], usage:"전원 장치와 연결해 전류를 흘리며 자기장을 관찰하고, 코일 저항을 초과하는 전류를 흘리지 않습니다.", location:"물지실 8번"
, photo:"images/8wonhyungcoil.png"},

{subject:"기타", room:"물지실", name:"스위치", desc:"전기 회로의 연결과 차단을 조작하는 기본 회로 부품",
   tags:["전기회로","회로개폐"], usage:"회로 연결 전 스위치를 열어둔 상태로 배선하며, 접점 부위의 이물질을 제거합니다.", location:"물지실 8번"
, photo:"images/8switch.jfif"},

{subject:"물리", room:"물지실", name:"그네형 전자기력 실험기", desc:"전류가 흐르는 도선이 자기장 속에서 받는 힘(전자기력)을 그네 운동으로 관찰하는 실험 기구",
   tags:["전자기력","플레밍왼손법칙"], usage:"도선에 전류를 흘려 자기장 속에서의 진동을 관찰하며, 전류 방향과 자석 극을 바꿔가며 실험합니다.", location:"물지실 7번"
 , photo:"images/7gunehyungjunjaguryuk.jpg"},

{subject:"물리", room:"물지실", name:"편광판", desc:"빛의 진동 방향을 한 방향으로 걸러내어 편광 현상을 관찰하는 광학 기구",
   tags:["빛의편광","광학실험"], usage:"두 편광판을 겹쳐 회전시키며 빛의 세기 변화를 관찰하며, 표면에 지문이 묻지 않도록 조심히 다룹니다.", location:"물지실 7번"
 , photo:"images/7pyungwngpan.png"},

{subject:"물리", room:"물지실", name:"가이거-뮐러 계수기", desc:"방사선의 존재와 세기를 검출·측정하는 방사선 계측 기구",
   tags:["방사선측정","방사능실험"], usage:"측정 대상에 탐침을 가까이 하여 계수율을 확인하며, 방사선원 취급 시 안전수칙을 반드시 준수합니다.", location:"물지실 7번"
 , photo:"images/7gaigeomyiler.jpg"},

{subject:"물리", room:"물지실", name:"광전류실험장치", desc:"빛을 비추어 발생하는 광전효과와 광전류를 관찰하는 실험 기구",
   tags:["광전효과","광전류"], usage:"광원의 세기와 파장을 조절하며 전류계로 광전류를 측정하고, 광원을 눈으로 직접 보지 않습니다.", location:"물지실 7번"
 , photo:"images/7gwangjunryusilhum.jpg"},

{subject:"물리", room:"물지실", name:"돋보기", desc:"볼록렌즈를 이용해 물체의 상을 확대하여 관찰하는 광학 기구",
   tags:["볼록렌즈","상의확대"], usage:"물체와 렌즈 사이의 거리를 조절하며 초점을 맞추고, 렌즈 표면을 손으로 만지지 않습니다.", location:"물지실 6번"
, photo:"images/6dodbogi.jpg"},

{subject:"물리", room:"물지실", name:"프리즘", desc:"빛을 굴절시켜 여러 파장으로 분산시키는 삼각기둥 모양의 광학 기구",
   tags:["빛의분산","굴절실험"], usage:"광원의 빛을 비스듬히 통과시켜 스펙트럼을 관찰하며, 표면에 흠집이 나지 않도록 조심히 다룹니다.", location:"물지실 6번"
, photo:"images/6prisom.jpg"},

{subject:"물리", room:"물지실", name:"레이저 발생기", desc:"단일 파장의 직진성 있는 빛을 발생시켜 광학 실험에 사용하는 장치",
   tags:["빛의직진","간섭회절실험"], usage:"레이저 광선을 눈에 직접 조사하지 않도록 주의하며, 사용 후 즉시 전원을 차단합니다.", location:"물지실 6번"
, photo:"images/6laserbalsaenggi.jpg"},

{subject:"물리", room:"물지실", name:"직선광원장치", desc:"직진하는 빛을 발생시켜 빛의 진행과 굴절 실험에 사용하는 광원 장치",
   tags:["빛의직진","굴절실험"], usage:"광원의 각도를 조절하며 빛의 경로를 관찰하고, 렌즈나 필터 사용 시 파손에 주의합니다.", location:"물지실 6번"
, photo:"images/6jiksungwangwon.jpg"},

{subject:"물리", room:"물지실", name:"오케이 플라즈마", desc:"내부 기체를 방전시켜 플라즈마 방전 현상을 시각적으로 관찰하는 플라즈마볼",
   tags:["플라즈마방전","전기방전"], usage:"전원을 켠 후 유리구 표면에 손을 대어 방전 줄기의 움직임을 관찰하며, 장시간 접촉은 피합니다.", location:"물지실 5번"
, photo:"images/5okayplazma.jfif"},

{subject:"물리", room:"물지실", name:"시간기록계", desc:"일정한 시간 간격으로 종이테이프에 점을 찍어 물체의 운동을 기록하는 기구",
   tags:["등가속도운동","속도측정"], usage:"종이테이프를 수레에 연결한 후 전원을 켜고 운동시키며, 타점 간격으로 속도를 분석합니다.", location:"물지실 5번"
, photo:"images/5sigangirokkye.jpg"},

{subject:"화학", room:"물지실", name:"결정축모형", desc:"결정의 대칭성과 축 구조를 입체적으로 보여주는 결정학 모형",
   tags:["결정구조","결정계분류"], usage:"모형의 축과 면 배열을 관찰하며 결정계를 분류하고, 조립 부품 파손에 주의합니다.", location:"물지실 5번"
, photo:"images/5gyeoljungcukmohyung.jpg"},

{subject:"화학", room:"물지실", name:"피즈키퍼", desc:"탄산음료 용기 내 압력을 유지시켜 기체 압력과 용해 실험에 활용하는 기구",
   tags:["기체압력","기체용해도"], usage:"용기 뚜껑에 장착 후 펌프질하여 압력을 가하며, 과도한 압력을 가하지 않도록 주의합니다.", location:"물지실 5번"
, photo:"images/5pizkeeper.jfif"},

{subject:"지구", room:"물지실", name:"클리노미터", desc:"지층이나 경사면의 기울기(경사각)를 측정하는 지질 조사 기구",
   tags:["지층경사","지질조사"], usage:"측정면에 밀착시켜 수평을 맞춘 후 눈금을 읽으며, 평평한 면에서 측정해야 정확합니다.", location:"물지실 5번"
, photo:"images/5clinometer.jpg"},

{subject:"지구", room:"물지실", name:"방해석투명결정", desc:"복굴절 현상을 관찰할 수 있는 투명한 방해석 결정 표본",
   tags:["복굴절현상","광물관찰"], usage:"결정 아래에 글자를 놓고 위에서 관찰하여 상이 두 개로 겹쳐 보이는 복굴절을 확인하며, 표면에 흠집이 나지 않도록 조심히 다룹니다.", location:"물지실 4번"
, photo:"images/4banghaesuk.jpg"},

{subject:"지구", room:"물지실", name:"완족류 화석표본", desc:"고생대~중생대 해양 생물인 완족류의 형태를 보여주는 화석 표본",
   tags:["표준화석","고생물학"], usage:"표본의 표면과 껍데기 구조를 관찰하며 지질시대를 추정하고, 낙하나 마찰로 인한 손상에 주의합니다.", location:"물지실 4번"
, photo:"images/4wanjokryu.jpg"},

{subject:"지구", room:"물지실", name:"화산분출물표본", desc:"화산 활동으로 생성된 화산재·화산탄 등 분출물을 관찰하는 표본",
   tags:["화산활동","화성암생성"], usage:"표본의 색·기공·조직을 관찰하여 분출 당시의 환경을 유추하며, 가루가 날리지 않도록 조심히 다룹니다.", location:"물지실 4번"
, photo:"images/4hwasanbunculmul.jpeg"},

{subject:"지구", room:"물지실", name:"면각측정용수정표본", desc:"결정면 사이의 각도를 측정하여 결정의 규칙성을 확인하는 수정 표본",
   tags:["결정면각","면각일정법칙"], usage:"면각측정기(고니오미터) 등과 함께 사용해 결정면 사이 각도를 측정하며, 결정 모서리 파손에 주의합니다.", location:"물지실 4번"
, photo:"images/4myungak.jpeg"},

{subject:"지구", room:"물지실", name:"화석표본", desc:"다양한 지질시대의 생물 화석을 관찰·분류하는 표본",
   tags:["시상화석","지질시대분류"], usage:"화석의 형태와 보존 상태를 관찰하여 생성 환경과 시대를 추정하며, 조심히 다뤄 파손을 방지합니다.", location:"물지실 4번"
, photo:"images/4hwasukpyobon.jpeg"},

{subject:"지구", room:"물지실", name:"지질조사용구세트", desc:"암석·지층 관찰과 채집에 사용하는 지질 조사용 도구 모음",
   tags:["지질조사","야외관찰"], usage:"암석 채집 시 지질망치와 보호경 등을 함께 사용하며, 날카로운 도구 사용 시 안전에 유의합니다.", location:"물지실 4번"
, photo:"images/4jijiljosa.jfif"},

{subject:"지구", room:"물지실", name:"변성암표본", desc:"높은 열과 압력으로 기존 암석의 조직이 변화되어 생성된 변성암 표본",
   tags:["변성작용","엽리구조"], usage:"표본의 엽리와 광물 배열을 관찰하여 변성 정도를 파악하며, 표면 마모나 파손에 주의합니다.", location:"물지실 3번"
, photo:"images/3byunsungam.jpeg"},

{subject:"지구", room:"물지실", name:"화성암표본", desc:"마그마가 냉각되어 굳어져 생성된 화성암의 종류를 관찰하는 표본",
   tags:["화성암분류","결정크기"], usage:"결정 크기와 색을 관찰하여 심성암과 화산암을 구분하며, 표본이 깨지지 않도록 조심히 다룹니다.", location:"물지실 3번"
, photo:"images/3hwansungam.jpeg"},

{subject:"지구", room:"물지실", name:"퇴적암표본", desc:"퇴적물이 다져지고 굳어져 생성된 퇴적암의 종류를 관찰하는 표본",
   tags:["퇴적작용","층리구조"], usage:"입자 크기와 층리 구조를 관찰하여 퇴적암의 종류를 분류하며, 표본 표면을 조심히 다룹니다.", location:"물지실 3번"
, photo:"images/3tyejukam.jpg"},

{subject:"지구", room:"물지실", name:"광물결정구조 모형", desc:"광물 내부 원자 배열과 결정 구조를 입체적으로 보여주는 모형",
   tags:["결정구조","원자배열"], usage:"모형의 원자 배열과 결합 방향을 관찰하며 광물의 물리적 성질과 연결지어 설명하고, 조립 부품 파손에 주의합니다.", location:"물지실 3번"
, photo:"images/3gwangmulgyeoljungguzomohyung.jpeg"},

{subject:"지구", room:"물지실", name:"전향력실험장치", desc:"회전하는 좌표계에서 물체의 운동 경로가 휘어지는 전향력(코리올리 힘)을 관찰하는 실험 기구",
   tags:["코리올리힘","지구자전효과"], usage:"회전판을 일정한 속도로 회전시키며 물체의 이동 경로 변화를 관찰하고, 회전 중 손이 끼이지 않도록 주의합니다.", location:"물지실 2번, 물지실 3번"
, photo:"images/3junhyangryuksilhum.jpeg"},

{subject:"지구", room:"물지실", name:"전향력측정기", desc:"회전하는 물체 위에서 전향력의 크기와 방향 변화를 정량적으로 측정하는 실험 기구",
   tags:["코리올리힘","자전효과측정"], usage:"회전 속도를 조절하며 이동 물체의 편향 정도를 측정하고, 회전 중에는 장치에 손을 대지 않습니다.", location:"물지실 2번"
, photo:"images/2junhyangcukjung.jpeg"},

{subject:"지구", room:"물지실", name:"지구본", desc:"지구의 위도·경도·지형 등을 입체적으로 나타낸 모형",
   tags:["위도경도","지구자전"], usage:"자전축 기울기를 확인하며 회전시켜 낮과 밤, 계절 변화를 설명하는 데 활용합니다.", location:"물지실 2번, 물지실 5번"
, photo:"images/2jigubon.jfif"},

{subject:"기타", room:"물지실", name:"흰스탠드", desc:"실험 대상에 균일한 조명을 제공하여 관찰과 촬영을 돕는 광원 기구",
   tags:["광학조명","실험보조도구"], usage:"장시간 사용 시 램프가 뜨거울 수 있으므로 주의하고, 사용 후에는 전원을 반드시 끄고 원래 위치에 보관합니다.", location:"물지실 1번"
, photo:"images/1standwhite.jpg"},

{subject:"물리", room:"물지실", name:"전구", desc:"전류를 흘려 빛과 열을 발생시키는 실험용 광원 기구",
   tags:["저항실험","옴의법칙"], usage:"회로에 연결하여 밝기와 저항 변화를 관찰하며, 점등 중 유리구에 직접 손을 대지 않습니다.", location:"물지실 1번"
, photo:"images/1jungu.jpg"},

{subject:"지구", room:"물지실", name:"L자형방위각고도측정기", desc:"천체나 지형지물의 방위각과 고도를 측정하는 지구과학 관측 기구",
   tags:["방위각측정","고도측정"], usage:"수평을 맞춘 후 대상을 조준하여 방위각과 고도를 읽으며, 조준부를 조심히 다룹니다.", location:"물지실 1번"
, photo:"images/1eljahyungbangwigodo.jpg"},

{subject:"지구", room:"물지실", name:"지형 모형", desc:"산·계곡·하천 등 지형의 입체적 형태를 보여주는 모형",
   tags:["지형관찰","등고선학습"], usage:"모형의 굴곡을 관찰하며 등고선과 지형의 관계를 설명하고, 표면 파손에 주의합니다.", location:"물지실 1번"
, photo:"images/1jihyungmohyung.jfif"},

{subject:"기타", room:"물지실", name:"멀티탭", desc:"여러 전기 기구에 동시에 전원을 공급하는 콘센트 확장 기구",
   tags:["전원공급","전기안전"], usage:"허용 전력 용량을 초과하지 않도록 사용하며, 물기가 있는 곳에서는 사용하지 않습니다.", location:"그외"
, photo:"images/0multitap.jfif"},

{subject:"지구", room:"물지실", name:"기상관측세트", desc:"온도·습도·기압·풍향 등 기상 요소를 종합적으로 측정하는 관측 기구 모음",
   tags:["기상관측","날씨요소측정"], usage:"각 기구를 설치 지침에 따라 배치한 후 정기적으로 값을 기록하며, 직사광선을 피해 설치합니다.", location:"그외"
, photo:"images/0gisanggwancuk.jpg"},

{subject:"지구", room:"물지실", name:"VIXEN 천체망원경", desc:"달·행성·별 등 천체를 확대하여 관측하는 광학 천체망원경",
   tags:["천체관측","행성관측"], usage:"삼각대를 안정적으로 고정한 후 초점을 맞춰 관측하며, 태양 관측 시 반드시 전용 필터를 사용합니다.", location:"그외"
, photo:"images/0vixen.jfif"},

{subject:"물리", room:"물지실", name:"자동차 레일", desc:"수레나 물체를 일정한 경로로 이동시켜 운동을 관찰하는 트랙형 실험 기구",
   tags:["등가속도운동","마찰실험"], usage:"레일을 수평 또는 원하는 각도로 고정한 후 물체를 이동시키며, 접합부 이탈에 주의합니다.", location:"그외"
, photo:"images/0jadongcharaeil.jpg"},


{subject:"기타", room:"물지실", name:"자(50cm/100cm)", desc:"물체의 길이를 정밀하게 측정하는 눈금자",
   tags:["길이측정","거리측정"], usage:"측정 대상에 눈금자를 밀착시켜 읽으며, 시선을 눈금과 수직으로 맞춰 오차를 줄입니다.", location:"그외"
, photo:"images/0ja.jpg"},

{subject:"기타", room:"물지실", name:"줄자", desc:"곡면이나 긴 거리를 측정할 수 있는 유연한 측정 도구",
   tags:["길이측정","곡면측정"], usage:"측정 시작점을 정확히 맞추고 팽팽하게 당겨 눈금을 읽으며, 되감을 때 손이 끼이지 않도록 주의합니다.", location:"그외"
, photo:"images/0julja.jfif"},

{subject:"물리", room:"물지실", name:"전자레인지", desc:"마이크로파를 이용해 물질을 가열하는 전자기파 실험 관련 기구",
   tags:["전자기파","마이크로파실험"], usage:"금속 물체를 넣지 않도록 주의하며, 작동 중에는 문을 열지 않습니다.", location:"그외"
, photo:"images/0junjarange.jfif"},

{subject:"물리", room:"물지실", name:"레이저 포인터", desc:"직진성이 강한 레이저 빛을 이용해 빛의 경로를 관찰하는 소형 광원 기구",
   tags:["빛의직진","광학실험"], usage:"레이저 빛을 눈에 직접 비추지 않도록 주의하며, 사용 후 즉시 전원을 끕니다.", location:"그외"
, photo:"images/0laserpointer.jpg"},

{subject:"물리", room:"물지실", name:"DC모터", desc:"직류 전류를 공급받아 회전 운동을 발생시키는 전동기",
   tags:["전자기유도","에너지전환"], usage:"허용 전압 범위 내에서 전원을 연결하며, 회전축에 손이 닿지 않도록 주의합니다.", location:"그외"
, photo:"images/0dcmotor.jfif"},

{subject:"기타", room:"물지실", name:"종이컵", desc:"간단한 실험 도구나 용기로 다양한 실험에 활용되는 소모품",
   tags:["실험보조도구","소모품"], usage:"필요한 실험에 맞게 절단하거나 조립하여 사용하며, 물이나 액체 사용 시 새는지 확인합니다.", location:"그외"
, photo:"images/0jongyicub.jfif"},

{subject:"기타", room:"물지실", name:"실", desc:"물체를 매달거나 연결하는 데 사용하는 실험 보조 도구",
   tags:["진자실험","실험보조도구"], usage:"필요한 길이로 잘라 사용하며, 매듭이 풀리지 않도록 단단히 고정합니다.", location:"그외"
, photo:"images/0sil.jpg"},

{subject:"기타", room:"물지실", name:"흰색 칼라보드", desc:"모형이나 구조물 제작에 사용하는 흰색 스티로폼 우드락 보드",
   tags:["모형제작","실험보조재료"], usage:"칼로 원하는 모양으로 자르거나 조립하며, 절단 시 손 베임에 주의합니다.", location:"그외"
, photo:"images/0calarboard.jpg"},

{subject:"기타", room:"물지실", name:"페트병", desc:"물로켓 등 다양한 실험에 재활용되는 플라스틱 용기",
   tags:["물로켓실험","실험보조도구"], usage:"뚜껑과 몸체가 견고한지 확인 후 사용하며, 압력 실험 시 파손에 주의합니다.", location:"그외"
, photo:"images/0pet.jpg"},

{subject:"물리", room:"물지실", name:"물로켓발사기", desc:"물과 공기 압력을 이용해 페트병 로켓을 발사시키는 실험 기구",
   tags:["작용반작용","운동량보존"], usage:"발사 전 주변에 사람이 없는지 확인하고, 발사 방향을 안전한 곳으로 조준합니다.", location:"그외"
, photo:"images/0mulroket.jpg"}



];
