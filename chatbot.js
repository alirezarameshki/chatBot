const send_message = document.querySelector(".send_message")
const input = document.querySelector(".type_message");
const message_box = document.querySelector(".message_box")

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
    "Authorization": "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",
    "HTTP-Referer": "<YOUR_SITE_URL>", // Optional. Site URL for rankings on openrouter.ai.
    "X-Title": "<YOUR_SITE_NAME>", // Optional. Site title for rankings on openrouter.ai.
    "Content-Type": "application/json"
  },
  body: JSON.stringify({
    "model": "deepseek/deepseek-chat:free",
    "messages": [
      {
        "role": "user",
        "content": input.value
      }
    ]
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

 
