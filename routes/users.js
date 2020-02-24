var express = require('express');
var nbiScraper=require('../nbiScraper.js');
var publicInfo=require('../publicInfo.js')
var bizRepo=require('../bizRepoInfo.js')
var comInfo=require('../comFinInfo.js')
var disInterest=require('../disclosureInterest.js')
var ownCodeFinder=require('../findOwnCode.js')
var router = express.Router();

/* GET users listing. */
router.get('/nbi/kis/:code', function(req, res) {
  nbiScraper.doScrap(req.params.code).then(function(result){
    res.send(result);
  })
});

//공시정보
router.get('/dart/publicinfo/:selector/:code',function(req,res){
  ownCodeFinder.findComName(req.params.code).then(function(result){
    //기업 opendart고유번호 검색
    return ownCodeFinder.findOwnCode(result)
  }).then(function(result){
    if(req.params.selector==0) {
      //공시검색
      return publicInfo.publicSearch(result)
    }
    else if(req.params.selector==1){
      //기업개황
      return publicInfo.companyOutlook(result)
    }
  }).then(function(result){
    console.log(result);
    res.send(result)
  })
})

//사업보고서 주요정보
router.get('/dart/bizrepo/:selector/:code/:year/:repocode',function(req,res){
  ownCodeFinder.findComName(req.params.code).then(function(result){
    //기업 opendart고유번호 검색
    return ownCodeFinder.findOwnCode(result)
  }).then(function(result){
    if(req.params.selector==0){
      //증자감자 현황
      return bizRepo.capirStatus(result,req.params.year,req.params.repocode)
    }
    else if (req.params.selector==1){
      //배당에 관한 사항
      return bizRepo.alocMatter(result,req.params.year,req.params.repocode)
    }
    else if(req.params.selector==2){
      //자기주식 취득 및 처분 현황
      return bizRepo.stockAcDs(result,req.params.year,req.params.repocode)
    }
    else if (req.params.selector==3){
      //최대주주 현황
      return bizRepo.largestShrStat(result,req.params.year,req.params.repocode)
    }
    else if (req.params.selector==4) {
      //최대주주 변동 현황
      return bizRepo.largestShrChg(result,req.params.year,req.params.repocode)
    }
    else if (req.params.selector==5) {
      //소액주주 현황
      return bizRepo.minorShrStat(result,req.params.year,req.params.repocode)
    }
    else if (req.params.selector==6) {
      //임원 현황
      return bizRepo.execStat(result,req.params.year,req.params.repocode)
    }
    else if (req.params.selector==7) {
      //직원 현황
      return bizRepo.empStat(result,req.params.year,req.params.repocode)
    }
    else if (req.params.selector==8) {
      //이사,감사의 개인별 보수현황
      return bizRepo.execAuditStat(result,req.params.year,req.params.repocode)
    }
    else if (req.params.selector==9) {
      //이사,감사의 전체 보수현황
      return bizRepo.execAuditTotStat(result,req.params.year,req.params.repocode)
    }
    else if (req.params.selector==10) {
      //개인별 보수지급 금액
      return bizRepo.indivByPay(result,req.params.year,req.params.repocode)
    }
    else{
      //타법인 출자현황
      return bizRepo.otherCorpStmStat(result,req.params.year,req.params.repocode)
    }
  }).then(function(result){
    console.log(result);
    res.send(result)
  })
})

//상장기업 재무정보
router.get('/dart/comfininfo/:selector/:code/:year/:repocode',function(req,res){
  ownCodeFinder.findComName(req.params.code).then(function(result){
    //기업 opendart고유번호 검색
    return ownCodeFinder.findOwnCode(result)
  }).then(function(result){
    if(req.params.selector==0){
      //단일회사 주요계정
      return comInfo.singleCom(result,req.params.year,req.params.repocode)
    }
    else if(req.params.selector==1) {
      //다중회사 주요계정
      return comInfo.multiCom(result,req.params.year,req.params.repocode)
    }
  }).then(function(result){
    console.log(result);
    res.send(result)
  })
})

//지분공시 종합정보
router.get('/dart/discinterest/:selector/:code',function(req,res){
  ownCodeFinder.findComName(req.params.code).then(function(result){
    //기업 opendart고유번호 검색
    return ownCodeFinder.findOwnCode(result)
  }).then(function(result){
    if(req.params.selector==0){
      //대량보유 상황보고
      return disInterest.majorStock(result)
    }
    else if (req.params.selector==1) {
      //임원,주요주주 소유보고
      return disInterest.eleStock(result)
    }
  }).then(function(result){
    console.log(result);
    res.send(result)
  })
})

module.exports = router;
