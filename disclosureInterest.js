const puppeteer=require('puppeteer')

const majorStock=async(code)=>{
  //대량보유 상황보고
  var result={okay:'',data:''}
  try {
    const browser=await puppeteer.launch({
      headless: true,
      args:['--no-sandbox']
    })

    var res=[]
    for(i=0;i<code.length;i++){
      var url='https://opendart.fss.or.kr/api/majorstock.json?crtfc_key=a0466665ee663766eefdf750fb61db9f41198c5f&corp_code='+code[i]
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

const eleStock=async(code)=>{
  //임원,주요주주 소유보고
  var result={okay:'',data:''}
  try {
    const browser=await puppeteer.launch({
      headless: true,
      args:['--no-sandbox']
    })

    var res=[]
    for(i=0;i<code.length;i++){
      var url='https://opendart.fss.or.kr/api/majorstock.json?crtfc_key=a0466665ee663766eefdf750fb61db9f41198c5f&corp_code='+code[i]
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

exports.majorStock=majorStock
exports.eleStock=eleStock
