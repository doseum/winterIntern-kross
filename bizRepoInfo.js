const puppeteer=require('puppeteer')

const capirStatus=async(code,year,repocode)=>{
  //증자,감자 현황
  var result={okay:'',data:''}
  try {
    const browser=await puppeteer.launch({
      headless: true,
      args:['--no-sandbox']
    })

    var res=[]
    for(i=0;i<code.length;i++){
      var url='https://opendart.fss.or.kr/api/irdsSttus.json?crtfc_key=a0466665ee663766eefdf750fb61db9f41198c5f&corp_code='+code[i]+'&bsns_year='+year+'&reprt_code='+repocode
      const page = await browser.newPage();
      await page.goto(url)

      await page.waitForSelector('body > pre')

      res.push(JSON.parse(await page.evaluate(()=>{
        return Array.from(document.querySelectorAll('body > pre')).map(body=>(body.textContent))
      })))
      await page.goto('about:blank')
      await page.close()
    }
    await browser.close()
    result.okay=true;
    result.data=res;
    return result
  } catch (e) {
    result.okay=false
    result['message']=e
    return result
  }
}

const alocMatter=async(code,year,repocode)=>{
  //배당에 관한 사항
  var result={okay:'',data:''}
  try {
    const browser=await puppeteer.launch({
      headless: true,
      args:['--no-sandbox']
    })

    var res=[]
    for(i=0;i<code.length;i++){
      var url='https://opendart.fss.or.kr/api/alotMatter.json?crtfc_key=a0466665ee663766eefdf750fb61db9f41198c5f&corp_code='+code[i]+'&bsns_year='+year+'&reprt_code='+repocode
      const page = await browser.newPage();
      await page.goto(url)

      await page.waitForSelector('body > pre')

      res.push(JSON.parse(await page.evaluate(()=>{
        return Array.from(document.querySelectorAll('body > pre')).map(body=>(body.textContent))
      })))
    }
    await browser.close()
    result.okay=true
    result.data=res
    return result
  } catch (e) {
    result.okay=false
    result['message']=e
    return result
  }
}

const stockAcDs=async(code,year,repocode)=>{
  //자기주식 취득 및 처분현황
  var result={okay:'',data:''}
  try{
    const browser=await puppeteer.launch({
      headless: true,
      args:['--no-sandbox']
    })

    var res=[]
    for(i=0;i<code.length;i++){
      var url='https://opendart.fss.or.kr/api/tesstkAcqsDspsSttus.json?crtfc_key=a0466665ee663766eefdf750fb61db9f41198c5f&corp_code='+code[i]+'&bsns_year='+year+'&reprt_code='+repocode
      const page = await browser.newPage();
      await page.goto(url)

      await page.waitForSelector('body > pre')

      res.push(JSON.parse(await page.evaluate(()=>{
        return Array.from(document.querySelectorAll('body > pre')).map(body=>(body.textContent))
      })))
    }
    await browser.close()
    result.okay=true;
    result.data=res
    return result
  } catch (e) {
    result.okay=false
    result['message']=e
    return result
  }
}

const largestShrStat=async(code,year,repocode)=>{
  //최대주주 현황
  var result={okay:'',data:''}
  try {
    const browser=await puppeteer.launch({
      headless: true,
      args:['--no-sandbox']
    })

    var res=[]
    for(i=0;i<code.length;i++){
      var url='https://opendart.fss.or.kr/api/hyslrSttus.json?crtfc_key=a0466665ee663766eefdf750fb61db9f41198c5f&corp_code='+code[i]+'&bsns_year='+year+'&reprt_code='+repocode
      const page = await browser.newPage();
      await page.goto(url)

      await page.waitForSelector('body > pre')

      res.push(JSON.parse(await page.evaluate(()=>{
        return Array.from(document.querySelectorAll('body > pre')).map(body=>(body.textContent))
      })))
    }
    await browser.close()
    result.okay=true
    result.data=res
    return result
  } catch (e) {
    result.okay=false
    result['message']=e
    return result
  }
}

const largestShrChg=async(code,year,repocode)=>{
  //최대주주 변동 현황
  var result={okay:'',data:''}
  try {
    const browser=await puppeteer.launch({
      headless: true,
      args:['--no-sandbox']
    })

    var res=[]
    for(i=0;i<code.length;i++){
      var url='https://opendart.fss.or.kr/api/hyslrChgSttus.json?crtfc_key=a0466665ee663766eefdf750fb61db9f41198c5f&corp_code='+code[i]+'&bsns_year='+year+'&reprt_code='+repocode
      const page = await browser.newPage();
      await page.goto(url)

      await page.waitForSelector('body > pre')

      res.push(JSON.parse(await page.evaluate(()=>{
        return Array.from(document.querySelectorAll('body > pre')).map(body=>(body.textContent))
      })))
    }
    await browser.close()
    result.okay=true
    result.data=res
    return result
  } catch (e) {
    result.okay=false
    result['message']=e
    return result
  }
}

const minorShrStat=async(code,year,repocode)=>{
  //소액주주 변동 현황
  var result={okay:'',data:''}
  try {
    const browser=await puppeteer.launch({
      headless: true,
      args:['--no-sandbox']
    })

    var res=[]
    for(i=0;i<code.length;i++){
      var url='https://opendart.fss.or.kr/api/mrhlSttus.json?crtfc_key=a0466665ee663766eefdf750fb61db9f41198c5f&corp_code='+code[i]+'&bsns_year='+year+'&reprt_code='+repocode
      const page = await browser.newPage();
      await page.goto(url)

      await page.waitForSelector('body > pre')

      res.push(JSON.parse(await page.evaluate(()=>{
        return Array.from(document.querySelectorAll('body > pre')).map(body=>(body.textContent))
      })))
    }
    await browser.close()
    result.okay=true;
    result.data=res
    return result
  } catch (e) {
    result.okay=false
    result['message']=e
    return result
  }
}

const execStat=async(code,year,repocode)=>{
  //임원 현황
  var result={okay:'',data:''}
  try {
    const browser=await puppeteer.launch({
      headless: true,
      args:['--no-sandbox']
    })

    var res=[]
    for(i=0;i<code.length;i++){
      var url='https://opendart.fss.or.kr/api/exctvSttus.json?crtfc_key=a0466665ee663766eefdf750fb61db9f41198c5f&corp_code='+code[i]+'&bsns_year='+year+'&reprt_code='+repocode
      const page = await browser.newPage();
      await page.goto(url)

      await page.waitForSelector('body > pre')

      res.push(JSON.parse(await page.evaluate(()=>{
        return Array.from(document.querySelectorAll('body > pre')).map(body=>(body.textContent))
      })))
    }
    await browser.close()
    result.okay=true
    result.data=res
    return result
  } catch (e) {
    result.okay=false
    result['message']=e
    return result
  }
}

const empStat=async(code,year,repocode)=>{
  //직원 현황
  var result={okay:'',data:''}
  try {
    const browser=await puppeteer.launch({
      headless: true,
      args:['--no-sandbox']
    })

    var res=[]
    for(i=0;i<code.length;i++){
      var url='https://opendart.fss.or.kr/api/empSttus.json?crtfc_key=a0466665ee663766eefdf750fb61db9f41198c5f&corp_code='+code[i]+'&bsns_year='+year+'&reprt_code='+repocode
      const page = await browser.newPage();
      await page.goto(url)

      await page.waitForSelector('body > pre')

      res.push(JSON.parse(await page.evaluate(()=>{
        return Array.from(document.querySelectorAll('body > pre')).map(body=>(body.textContent))
      })))
    }
    await browser.close()
    result.okay=true
    result.data=res;
    return result
  } catch (e) {
    result.okay=false
    result['message']=e
    return result
  }
}

const execAuditStat=async(code,year,repocode)=>{
  //이사,감사의 개인별 보수
  var result={okay:'',data:''}
  try {
    const browser=await puppeteer.launch({
      headless: true,
      args:['--no-sandbox']
    })

    var res=[]
    for(i=0;i<code.length;i++){
      var url='https://opendart.fss.or.kr/api/hmvAuditIndvdlBySttus.json?crtfc_key=a0466665ee663766eefdf750fb61db9f41198c5f&corp_code='+code[i]+'&bsns_year='+year+'&reprt_code='+repocode
      const page = await browser.newPage();
      await page.goto(url)

      await page.waitForSelector('body > pre')

      res.push(JSON.parse(await page.evaluate(()=>{
        return Array.from(document.querySelectorAll('body > pre')).map(body=>(body.textContent))
      })))
    }
    await browser.close()
    result.okay=true
    result.data=res
    return result
  } catch (e) {
    result.okay=false
    result['message']=e
    return result
  }
}

const execAuditTotStat=async(code,year,repocode)=>{
  //이사,감사의 전체의 보수현황
  var result={okay:'',data:''}
  try {
    const browser=await puppeteer.launch({
      headless: true,
      args:['--no-sandbox']
    })

    var res=[]
    for(i=0;i<code.length;i++){
      var url='https://opendart.fss.or.kr/api/hmvAuditAllSttus.json?crtfc_key=a0466665ee663766eefdf750fb61db9f41198c5f&corp_code='+code[i]+'&bsns_year='+year+'&reprt_code='+repocode
      const page = await browser.newPage();
      await page.goto(url)

      await page.waitForSelector('body > pre')

      res.push(JSON.parse(await page.evaluate(()=>{
        return Array.from(document.querySelectorAll('body > pre')).map(body=>(body.textContent))
      })))
    }
    await browser.close()
    result.okay=true
    result.data=res;
    return result
  } catch (e) {
    result.okay=false
    result['message']=e
    return result
  }
}

const indivByPay=async(code,year,repocode)=>{
  //개인별 보수지급 금액
  var result={okay:'',data:''}
  try {
    const browser=await puppeteer.launch({
      headless: true,
      args:['--no-sandbox']
    })

    var res=[]
    for(i=0;i<code.length;i++){
      var url='https://opendart.fss.or.kr/api/indvdlByPay.json?crtfc_key=a0466665ee663766eefdf750fb61db9f41198c5f&corp_code='+code[i]+'&bsns_year='+year+'&reprt_code='+repocode
      const page = await browser.newPage();
      await page.goto(url)

      await page.waitForSelector('body > pre')

      res.push(JSON.parse(await page.evaluate(()=>{
        return Array.from(document.querySelectorAll('body > pre')).map(body=>(body.textContent))
      })))
    }
    await browser.close()
    result.okay=true;
    result.data=res;
    return result
  } catch (e) {
    result.okay=false
    result['message']=e
    return result
  }
}

const otherCorpStmStat=async(code,year,repocode)=>{
  //타법인 출자현황
  var result={okay:'',data:''}
  try {
    const browser=await puppeteer.launch({
      headless: true,
      args:['--no-sandbox']
    })

    var res=[]
    for(i=0;i<code.length;i++){
      var url='https://opendart.fss.or.kr/api/otrCprInvstmntSttus.json?crtfc_key=a0466665ee663766eefdf750fb61db9f41198c5f&corp_code='+code[i]+'&bsns_year='+year+'&reprt_code='+repocode
      const page = await browser.newPage();
      await page.goto(url)

      await page.waitForSelector('body > pre')

      res.push(JSON.parse(await page.evaluate(()=>{
        return Array.from(document.querySelectorAll('body > pre')).map(body=>(body.textContent))
      })))
      await page.goto('about:blank')
      await page.close()
    }
    await browser.close()
    result.okay=true
    result.data=res;
    return result
  } catch (e) {
    result.okay=false
    result['message']=e
    return result
  }
}

exports.otherCorpStmStat=otherCorpStmStat
exports.indivByPay=indivByPay
exports.capirStatus=capirStatus
exports.alocMatter=alocMatter
exports.stockAcDs=stockAcDs
exports.largestShrStat=largestShrStat
exports.largestShrChg=largestShrChg
exports.minorShrStat=minorShrStat
exports.execStat=execStat
exports.empStat=empStat
exports.execAuditStat=execAuditStat
exports.execAuditTotStat=execAuditTotStat
