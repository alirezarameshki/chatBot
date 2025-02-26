const send_message = document.querySelector(".send_message")
const input = document.querySelector(".type_message");
const message_box = document.querySelector(".message_box")
const setting = document.querySelector(".setting")
const menu_item = document.querySelector(".menu_item");
menu_item.classList.add("display")
 
setting.addEventListener("click",()=>{
    if(menu_item.classList.contains("display")){
        menu_item.classList.remove("display")
    }
    else{
        menu_item.classList.add("display")
    }
})

menu_item.addEventListener("click", () => {
    
    localStorage.clear()

    location.reload()

    if(menu_item.classList.contains("display")){
        menu_item.classList.remove("display")
    }
    else{
        menu_item.classList.add("display")
    }
});

const Get_message = JSON.parse(localStorage.getItem("message")) || []
const Get_response = JSON.parse(localStorage.getItem("response")) || []

async function sendMessage() {
   if(input.value.trim() === "")return;
   
   const responseDiv = document.createElement("div")
   message_box.appendChild(responseDiv)

   responseDiv.classList.add("response")
   const loading = document.createElement("div")

   loading.classList.add("loading")

   responseDiv.appendChild(loading)
   message_box.scrollTop = message_box.scrollHeight

  
  
   try {
       
       const apiResponse = await fetch("https://openrouter.ai/api/v1/chat/completions", {
        method: "POST",
        headers: {
          "Authorization": "Bearer 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",
          "HTTP-Referer": "<YOUR_SITE_URL>", // Optional. Site URL for rankings on openrouter.ai.
          "X-Title": "<YOUR_SITE_NAME>", // Optional. Site title for rankings on openrouter.ai.
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          "model": "google/gemini-2.0-flash-lite-preview-02-05:free",
          "messages": [
            {"role": "user", "content": input.value}
          ],
          "top_p": 1,
          "temperature": 0.5,
          "repetition_penalty": 1
        })
      });

       
       if (!apiResponse.ok) {
           throw new Error(`HTTP error! Status: ${apiResponse.status}`);
       }

        
       const data = await apiResponse.json();
       console.log("API Response:", data);

     

       const error = "خطا در برقراری ارتباط با سرور , لطفا دوباره تلاش کنید."
       const markdownText = data.choices?.[0]?.message?.content || error;
       console.log("Markdown Text:", markdownText);

        
       responseDiv.classList.add("background")
       responseDiv.innerHTML =  marked.parse(markdownText)
    console.log(markdownText)
  
   } catch (error) {
       
       console.error("Error:", error);
       responseDiv.innerHTML = "error connection";

   }

   Get_response.push(responseDiv.innerHTML)

 localStorage.setItem("response",JSON.stringify(Get_response))
}

function create_user_message(){
  
   const message = document.createElement("div")
   message.innerHTML = input.value
   message_box.appendChild(message)
   message.classList.add("write")

   Get_message.push(input.value)
   localStorage.setItem("message",JSON.stringify(Get_message))
}



send_message.addEventListener("click",()=>{

   if(input.value.trim() == "")return;


   create_user_message();
   sendMessage()
   input.value = ""
})



document.addEventListener("DOMContentLoaded",()=>{
   const Get_message = JSON.parse(localStorage.getItem("message")) || []
   const Get_response = JSON.parse(localStorage.getItem("response")) || []

   for(var i = 0; i < Get_response.length;i++){
       const message = document.createElement("div")
       message.innerHTML = Get_message[i]
       message_box.appendChild(message)
       message.classList.add("write")

   const response = document.createElement("div")
    response.innerHTML = Get_response[i]
    response.classList.add("response")
    response.classList.add("background")
    message_box.appendChild(response)
   }

   message_box.scrollTop = message_box.scrollHeight  

})

 
