const apiKey="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";
const apiUrl="https://api.openai.com/v1/chat/completions";

const promptInput= document.getElementById("promptInput");
const generateBtn= document.getElementById("generateBtn");
const Stopbtn= document.getElementById("Stopbtn");
const resultText= document.getElementById("resultText");



const generate= async (e)=>{
    if(!promptInput.value){
        alert("Please Enter A Prompt.")
        return
    }

    generateBtn.disabled=true;
    resultText.innerText="Generating...."



    try {
        const response= await fetch(apiUrl,{
            method:"POST",
            headers:{
                "Content-Type":"application/json",
                Authorization:`Bearer ${apiKey}`
            },
            body:JSON.stringify({
                model:"gpt-3.5-turbo",
                messages:[
                    {role:"system",content:"You are helpfull assistant for College application"}
                    ,{role:"user", content:promptInput.value}]
            })
        })
        const data= await response.json();
       
        resultText.innerText=data.choices[0].message.content;
        
    } catch (error) {
        resultText.innerText="Error occured while generating."
        console.log("Error:",error);
        
    } finally{
        generateBtn.disabled=false;
    }
}
generateBtn.addEventListener("click", generate);
promptInput.addEventListener("keyup",(e)=>{
    if(e.key==="Enter"){
        genearate();
    }
});