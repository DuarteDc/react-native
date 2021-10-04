    class Http{
        static instance =new Http();
        get= async(url)=>{
            try {
                let req=await fetch(url);
                let json =await req.json();
                return json;
            } catch (error) {
                console.log("http method get error", error)
                throw Error(error)
            }
        }

        post =async()=>{
            try{
                let req=fetch(url,{
                    method:'post',
                    body,
                });
                let json=await (await req).json();
                return json;
            }catch(error){
                console.log("http method post error", error)
                throw Error(error)
            }
        }
    }

    export default Http;