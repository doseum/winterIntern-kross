const puppeteer=require('puppeteer')

const singleCom=async(code,year,repocode)=>{
  //단일회사 주요계정
  var result={okay:'',data:''}
  try {
    const browser=await puppeteer.launch({
      headless: true,
      args:['--no-sandbox']
    })

    var res=[]
    for(i=0;i<code.length;i++){
      var url='https://opendart.fss.or.kr/api/fnlttSinglAcnt.json?crtfc_key=a0466665ee663766eefdf750fb61db9f41198c5f&corp_code='+code[i]+'&bsns_year='+year+'&reprt_code='+repocode
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

const multiCom=async(code,year,repocode)=>{
  //다중회사 주요계정
  var result={okay:'',data:''}
  try {
    const browser=await puppeteer.launch({
      headless: true,
      args:['--no-sandbox']
    })

    var res=[]
    var longcode=''
    for(i=0;i<code.length;i++){
      if(i==0) longcode=code[i]
      else longcode=longcode+','+code[i]
    }
    console.log(longcode);
    var url='https://opendart.fss.or.kr/api/fnlttSinglAcnt.json?crtfc_key=a0466665ee663766eefdf750fb61db9f41198c5f&corp_code='+longcode+'&bsns_year='+year+'&reprt_code='+repocode
    const page = await browser.newPage();
    await page.goto(url)

    await page.waitForSelector('body > pre')

    res.push(JSON.parse(await page.evaluate(()=>{
      return Array.from(document.querySelectorAll('body > pre')).map(body=>(body.textContent))
    })))
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

exports.singleCom=singleCom
exports.multiCom=multiCom
