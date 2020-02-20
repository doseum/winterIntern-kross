const puppeteer=require('puppeteer')

const pubSearch=async(code)=>{
  //공시검색
  try {
    const browser=await puppeteer.launch({
      headless: true,
      args:['--no-sandbox']
    })

    var res=[]
    for(i=0;i<code.length;i++){
      var url='https://opendart.fss.or.kr/api/list.json?crtfc_key=a0466665ee663766eefdf750fb61db9f41198c5f&corp_code='+code[i]
      const page = await browser.newPage();
      await page.goto(url)

      await page.waitForSelector('body > pre')

      res.push(await page.evaluate(()=>{
        return Array.from(document.querySelectorAll('body > pre')).map(body=>(body.textContent))
      }))
    }
    return res
  } catch (e) {
    console.log(e);
    return e
  }
}

const companyOutlook=async(code)=>{
  //기업개황
  try {
    const browser=await puppeteer.launch({
      headless: true,
      args:['--no-sandbox']
    })

    var res=[]
    for(i=0;i<code.length;i++){
      var url='https://opendart.fss.or.kr/api/company.json?crtfc_key=a0466665ee663766eefdf750fb61db9f41198c5f&corp_code='+code[i]
      const page = await browser.newPage();
      await page.goto(url)

      await page.waitForSelector('body > pre')

      res.push(await page.evaluate(()=>{
        return Array.from(document.querySelectorAll('body > pre')).map(body=>(body.textContent))
      }))
    }
    return res
  } catch (e) {
    console.log(e);
    return e
  }
}

exports.publicSearch=pubSearch
exports.companyOutlook=companyOutlook
