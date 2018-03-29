import Story from "./story.mjs";
import webdriver from 'selenium-webdriver';

export default class LoginStory extends Story{
    constructor(arrStory){
        super(arrStory);
        this.username="";
        this.password="";
        this.expected="";
        this.actual="";
    }
    When(arrStory){
        super.When(arrStory);
        if(/enter\suser\sname/i.test(arrStory)) this.username=arrStory.substr(arrStory.indexOf("[")+1,(arrStory.lastIndexOf("]")-arrStory.indexOf("["))-1);
        if(/enter\spassword/i.test(arrStory)) this.password=arrStory.substr(arrStory.indexOf("[")+1,(arrStory.lastIndexOf("]")-arrStory.indexOf("["))-1);
    }
    Then(arrStory){
        super.Then(arrStory);
        this.expected=arrStory.substr(arrStory.indexOf("[")+1,(arrStory.lastIndexOf("]")-arrStory.indexOf("["))-1);
        
        let driver= new webdriver.Builder().forBrowser("chrome").build();
        const msg_url='https://everdoc.github.io/hellojs/quize/login.html';
        driver.get(msg_url);
        driver.wait(webdriver.until.urlIs(msg_url), 1000*10)
        .then((success)=>{
           console.log("Enter:",this.username);
           console.log("Enter:",this.password);
           driver.findElement(webdriver.By.id('name')).sendKeys(this.username);
           driver.findElement(webdriver.By.id('password')).sendKeys(this.password);
           driver.findElement(webdriver.By.tagName('button')).click();
           driver.findElement(webdriver.By.id('result')).getText().then((result)=>{
                this.actual=result;
                console.log("Expected:",this.expected);
                console.log("Actual:", this.actual);
                let isPass=new RegExp(this.expected,'i').test(this.actual);
                console.log("The case is", isPass?"PASS":"FAIL");
                driver.quit();
            });
        });
    }
}
