# agent_opendart

swagger UI를 통한 api-document 확인 @ 103.55.191.55/docs

배포 by Docker @ 103.55.191.55

*실행방법
1. ssh kross2019@103.55.191.55

2. home/fullScraper/agent_opendart에서 docker image build

3. 80번 port에 container의 3000번port 연결해서 run(docker run -p 80:3000 {2의 image이름}

OPENDART API 공식 개발가이드--> https://opendart.fss.or.kr/guide/main.do?apiGrpCd=DS001

nice를 통한 기업정보 scraping source=> nbiScraper.js  (return json데이터 형식의 object)

Opendart를 통한 공시정보 scraping source=> publicInfo.js  (return stringfy된 json 데이터)

Opendart를 통한 사업보고서 주요정보 scraping source=> bizRepoInfo.js  (return stringfy된 json 데이터)

Opendart를 통한 상장기업 재무정보 scraping source=> comFinInfo.js  (return stringfy된 json 데이터)

Opendart를 통한 지분공시 종합정보 scraping source=> disclosureInterest.js  (return stringfy된 json 데이터)
