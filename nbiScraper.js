const puppeteer=require('puppeteer')

function delay(timeout){
  return new Promise((resolve)=>{
    setTimeout(resolve,timeout);
  })
}

const doPuppeteer = async(code) => {
  try {
    code=code.replace(/-/gi,'')
    console.log(code);
    if(code.length==6){
      return scrapByCode(code);
    }
    else if(code.length==10){
      return scrapByNo(code);
    }
    else{
      throw new Error('code length error');
    }
  } catch (error) {
    return String(error);
  }
}

const scrapByCode =async(code)=>{
  var Company={result:''};
  try{
    const browser = await puppeteer.launch({
        headless : true, //headless모드를 킬지 말지
        args:['--no-sandbox']
    });
    //입력받은 url로 이동
    var url='https://www.nicebizinfo.com/ep/EP0100M002GE.nice?kiscode='+code
    const page = await browser.newPage();
    await page.goto(url,{waitUntil:'domcontentloaded'});

    //이동한 페이지에서 기업이름, 기업현황 크롤링
    await page.waitForSelector('body > div:nth-child(31) > div > div.cTable.sp2.mb10 > table > tbody',{timeout:5000});
    var val=await page.evaluate(()=>{//기업현황의 value값들 크롤링
      return Array.from(document.querySelectorAll('body > div:nth-child(31) > div > div.cTable.sp2.mb10 > table > tbody>tr>td>div>strong'))
      .map(tbody=>(tbody.textContent));
    })

    var data={companyName:String(await page.evaluate(()=>{//기업이름 크롤링
      return Array.from(document.querySelectorAll('body > div:nth-child(31) > div > div.header > h1'))
      .map(h1=>(h1.textContent))
    })), overview:''}
    await browser.close();
    var keyArr=['representer','address','groupname','bizNo','companyForm','industry','establishedDate','listedDate']

    var overview={};
    for(let i=0;i<val.length;i++){
      overview[keyArr[i]]=val[i];
    }
    data.overview=overview;
    Company['data']=data;
    Company.result=true;
    return Company//json형식 data return
  }catch(error){
    console.log(error);
    Company['error']=String(error);
    return Company;
  }
}

const scrapByNo=async(bizNo)=>{
  var Company={result:''};
  try{
    const browser = await puppeteer.launch({
        headless : true, //headless모드를 킬지 말지
        args:['--no-sandbox']
    });
    //입력받은 url로 이동
    var url='https://www.nicebizinfo.com/cm/CM0100M001GE.nice'
    const page = await browser.newPage();
    await page.goto(url,{waitUntil:'domcontentloaded'});

    //이동한 페이지에서 기업이름, 기업현황 크롤링
    await page.waitForSelector('#CM0100M001GE_itgSrch',{timeout:5000});

    await page.type('#CM0100M001GE_itgSrch',bizNo);

    const searchBtn=await page.waitFor('input')
    await searchBtn.press('Enter')

    await page.waitForNavigation()
    await page.click('body > div.cSection > div > div.cTable.sp3.mb60 > table > tbody > tr.bg > th > span.fz14.fwb.ml10.fErr > a')

    await delay(5000);

    var val=await page.evaluate(()=>{//기업현황의 value값들 크롤링
      console.log('val scrap complete');
      return Array.from(document.querySelectorAll('body > div:nth-child(31) > div > div.cTable.sp2.mb10 > table > tbody>tr>td>div>strong'))
      .map(tbody=>(tbody.textContent));
    })

    var data={companyName:String(await page.evaluate(()=>{//기업이름 크롤링
      return Array.from(document.querySelectorAll('body > div:nth-child(31) > div > div.header > h1'))
      .map(h1=>(h1.textContent))
    })), overview:''}
    await browser.close();
    var keyArr=['representer','address','groupname','bizNo','companyForm','industry','establishedDate','listedDate']

    var overview={};
    for(let i=0;i<val.length;i++){
      overview[keyArr[i]]=val[i];
    }
    data.overview=overview;
    Company['data']=data;
    Company.result=true;
    return Company//json형식 data return
  }catch(error){
    console.log(error);
    Company['error']=String(error);
    return Company;
  }
}

exports.doScrap=doPuppeteer;
