"use client";
import { useEffect, useState } from "react";

const Login = () => {
  const [loginResponse, setLoginResponse] = useState({})
  const [token, setToken] = useState("")
  const [pageId, setPageId] = useState("")
  const [pageName, setName] = useState("")
  const [review, setReview] = useState([])

  useEffect(() => {
    window.fbAsyncInit = function () {
      window.FB.init({
        appId: "771154157943252",
        autoLogAppEvents: true,
        xfbml: true,
        cookie: true,
        version: "v19.0", // Use the latest version available
      });
    };
  }, []);


  const HandleLogin = async () => {
    return new Promise((resolve, reject) => {
      window.FB.login((response) => {
        if (response.status == "connected") {
          setLoginResponse(response)
          setToken(response.authResponse.accessToken as string)
          console.log(token)
          console.log("User logged in successfully:", loginResponse);
        }
      }, {
        config_id: "1143724333643051"
      }
      );
    })
  };



  function TestAPI() {
    console.log("Welcome!  Fetching your information.... ");
    FB.api("/me/accounts", function (response:any) {
      console.log(response);
      setToken(response.data[0].access_token)
      setPageId(response?.data[0]?.id)
      setName(response?.data[0]?.name)
    });
  }

  console.log(pageId)

  function TestAPI2() {
    console.log("Welcome!  Fetching your information.... ");
    FB.api(`/${pageId}/ratings/?access_token=${token}`, function (response: any) {
      console.log(response);
      //TODO: set the review
      setReview(response.data)
    });
  }

  function TestAPI3() {
    console.log("Logout ");
    FB.logout();
  }

  return (
    <div>

      <div className="space-x-4">
        <button onClick={HandleLogin}>login</button>
        <button onClick={TestAPI}>fetch me</button>
        <button onClick={TestAPI2}>fetch page</button>
        <button onClick={TestAPI3}>Logout</button>
        <button className="fb-review-button">
        <a href={`https://web.facebook.com/profile.php?id=${pageId}&sk=reviews`} target="_blank">
            Leave a Review on Facebook
        </a>
    </button>
      </div>
      <div className="h-56 w-20">
        {review?.map((i:any)=>(
          <>
          <div>{i.review_text}</div>         
           <div>{i.name}</div>
           <div>{i.name}</div>
           </>

        ))}
        <div>

        </div>
      </div>
    </div>
  );
};

export default Login;
