import React, { useEffect, useState } from "react";
import background from '../Assets/bgimage.png'
import firebase from './firebaseconfig';
import basic from '../Assets/basic.svg';
import pro from '../Assets/pro.svg'
import business from '../Assets/business.svg'

const data = [
  {
    id: 1,
    src: basic,
    title: "Basic",
    price: "9.99",
  },
  {
    id: 2,
    src: pro,
    title: "Silver",
    price: "49.9",
  },
  {
    id: 3,
    src: business,
    title: "Gold",
    price: "99.9",
  },
];

const Paymentcard=() => {

  const [userId, setUserId] = useState("");
  const [planType, setPlanType] = useState("");

  useEffect(() => {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        setUserId(user.uid);
       
        const userRef = firebase.database().ref("users/" + user.uid);
        userRef.on("value", (snapshot) => {
          const user = snapshot.val();
          if (user) {
            setPlanType(user.subscription.planType || "");
          }
        });
      } else {
        setUserId("");
      
      }
    });
  }, [userId]);

  const checkout = (plan) => {
    fetch("http://localhost:5000/api/v1/create-subscription-checkout-session", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      mode: "cors",
      body: JSON.stringify({ plan: plan, customerId: userId }),
    })
      .then((res) => {
        if (res.ok) return res.json();
        console.log(res);
        return res.json().then((json) => Promise.reject(json));
      })
      .then(({ session }) => {
        window.location = session.url;
      })
      .catch((e) => {
        console.log(e.error);
      });
  };


  return (
    <>
    <div className="flex flex-col items-center w-full mx-auto min-h-screen diagonal-background overflow-x-hidden"  style={{ backgroundImage: `url(${background})` }} >
    
    <div className="mb-14" >
      
    <div
          className="grid lg:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-5 z-50 place-items-center w-9/12 mx-auto
        mt-20"
        >
          {data.map((item, idx) => (
            <div
              key={idx}
              className={`bg-white px-6 py-8 rounded-xl text-[#4f7cff] w-full mx-auto grid 
              place-items-center ${
                planType === item.title.toLowerCase() &&
                "border-[16px] border-green-400"
              }`}
            >
              <img
                src={item.src}
                alt=""
                width={200}
                height={200}
                className="h-40"
              />
                 <div className="text-4xl text-slate-700 text-center py-4 font-bold">
                {item.title}
              </div>
              <p className="lg:text-sm text-xs text-center px-6 text-slate-500">
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Dignissimos quaerat dolore sit eum quas non mollitia
                reprehenderit repudiandae debitis tenetur?
              </p>
              <div className="text-4xl text-center font-bold py-4">
                ${item.price}
              </div>
              <div className="mx-auto flex justify-center items-center my-3">
                {planType === item.title.toLowerCase() ? (
                  <button className="bg-pink-700 text-white rounded-md text-base uppercase w-auto py-2 px-4 font-bold">
                    Subscribed
                  </button>
                ) : (
                  <button
                    onClick={() => checkout(Number(item.price))}
                    className="bg-pink-500 text-white rounded-md text-base uppercase w-24 py-2 font-bold"
                  >
                   Buy Now
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
      </div>

  
    </>
  );
}

export default Paymentcard;