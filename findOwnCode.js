const puppeteer=require('puppeteer')
const fs=require('fs')
const ld=require('lodash')

function delay(timeout){
  return new Promise((resolve)=>{
    setTimeout(resolve,timeout);
  })
}

function findComName(code){
  return new Promise(async function(resolve,reject){
    const browser= await puppeteer.launch({
      headless:true,
      args:['--no-sandbox']
    })

    //입력받은 url로 이동
    var url='https://www.nicebizinfo.com/cm/CM0100M001GE.nice'
    const page = await browser.newPage();
    await page.goto(url,{waitUntil:'domcontentloaded'});

    //이동한 페이지에서 기업이름, 기업현황 크롤링
    await page.waitForSelector('#CM0100M001GE_itgSrch',{timeout:5000});

    await page.type('#CM0100M001GE_itgSrch',code);

    const searchBtn=await page.waitFor('input')
    await searchBtn.press('Enter')

    await page.waitForSelector('body > div.cSection > div > div.cTable.sp3.mb60 > table > tbody')
    await page.click('body > div.cSection > div > div.cTable.sp3.mb60 > table > tbody > tr.bg > th > span.fz14.fwb.ml10.fErr > a')

    await delay(5000)

    var ComName=await page.evaluate(()=>{
      return Array.from(document.querySelectorAll('body > div:nth-child(31) > div > div.header > h1'))
            .map(h1=>(h1.textContent))
    })

    var res
    if(ComName[0].indexOf('(주)')>0){
      res=ComName[0].slice(0,ComName[0].indexOf('(주)'))
    }
    else if(ComName[0].indexOf('(주)')==0){
      res=ComName[0].slice(3,ComName[0].length)
    }
    else res=ComName[0]
    resolve(res)
  })
}

function findOwnCode(name){
  return new Promise(function(resolve,reject){
    const CorpList=JSON.parse(fs.readFileSync('./CorpCode.json','utf-8'))
    const groupedList=ld.groupBy(CorpList.result.list,'corp_name')

    var res=[]
    ld.forEach(groupedList,function(value,key){
      if(key==name){
        for(i=0;i<value.length;i++){
          res.push(value[i].corp_code)
        }
      }
    })
    resolve(res)
  })

}

exports.findComName=findComName
exports.findOwnCode=findOwnCode
