"use client";

import React, { useEffect, useState } from "react";
import "./styles/style.css";
import mixpanel from "../config/mixpanel";
import NavBar from "./components/NavBar";
import CookieBanner from "./components/CookiesBanner";
import Link from "next/link";
import LikeIconSvg from "./components/LikeIconSvg";
import DislikeIconSvg from "./components/DislikeIconSvg";
import Script from "next/script";

const FetchWebsite = ({ url }: { url: string }) => {
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    const abortController = new AbortController();

    /**
     * Track website fetch event
     * @param url - URL of the website
     */
    const trackWebsiteFetch = (url: string) => {
      mixpanel.track("Website Fetched", { url });
    };

    const getSiteAvailability = async () => {
      try {
        await fetch(url, { mode: "no-cors", signal: abortController.signal });
        setHasError(false);

        // Track website fetch event
        trackWebsiteFetch(url);
      } catch (err) {
        setHasError(true);
      }
    };

    getSiteAvailability();

    return () => abortController.abort();
  }, [url]);

  return (
    <div>
      {hasError ? (
        <div className="error">
          An error occurred while loading the website.
        </div>
      ) : (
        <iframe
          src={url}
          style={{
            width: "100%",
            height: "600px",
            border: "none",
          }}
        ></iframe>
      )}
    </div>
  );
};

const Home = () => {
  const [url, setUrl] = useState("");
  const [sadFeedback, setSadFeedback] = useState(false);

  async function createTemplate() {
    const options = {
      method: "POST",
      headers: {
        accept: "application/json",
        "content-type": "application/json",
        "api-key":
          "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",
      },
      body: JSON.stringify({
        sender: { email: "savytskyimark@gmail.com" },
        templateName: "emailConfirmation",
        htmlContent: `<div
      style="
        font-family: Arial, sans-serif;
        font-size: large;
        max-width: 400px;
        margin: 0 auto;
        padding: 60px;
        border: 1px solid #e0e0e0;
        background-color: #ffffff;
      "
    >
      <div style="text-align: center; margin-bottom: 30px">
       <img  src="https://assets.vercel.com/image/upload/v1573246280/front/favicon/vercel/android-chrome-192x192.png" alt="vercel-3" crossorigin="anonymous" width='108' height='83' />
        <h2>Verify your email to log on to Vercel</h2>
      </div>

      <p>Hello,</p>
      <p>We have received a login attempt from Singapore</p>
      <p>To complete the login process, please click the button below:</p>
      <a
        href="www.google.com"
        style="
          display: block;
          width: 100px;
          padding: 15px 40px;
          margin-left: auto;
          margin-right: auto;
          margin-top: 40px;
          margin-bottom: 40px;
          background-color: #000000;
          color: #ffffff;
          text-align: center;
          text-decoration: none;
          border-radius: 5px;
        "
        >VERIFY</a
      >
      <p>Or copy and paste this URL into a new tab of your browser:</p>
      <div style="width: auto; margin-bottom: 60px">
        <a href="www.google.com" style="word-wrap: break-word">
          https://vercel.com/confirm?email=nsemek%40gmail.com&token=3geBc7LFLhLAwVwWWCRRr2M&mode=login
        </a>
      </div>
      <hr />
      <p style="margin-top: 30px">
        If you didn't attempt to log in but received this email, or if the location doesn't match, please ignore this email. If you are concerned
        about your account's safety, please reply to this email to get in touch with us.
      </p>
    </div>`,
        subject: "Email confirmation",
        isActive: true,
      }),
    };

    fetch("https://api.brevo.com/v3/smtp/templates", options)
      .then((response) => response.json())
      .then(({ id }) => sendEmail(id))
      .catch((err) => console.error(err));
  }

  async function sendEmail(id: number) {
    const options = {
      method: "POST",
      headers: {
        accept: "application/json",
        "content-type": "application/json",
        "api-key":
          "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",
      },
      body: JSON.stringify({
        to: [{ email: "dorozhe.zolota777@gmail.com" }],
        templateId: id,
      }),
    };

    await fetch("https://api.brevo.com/v3/smtp/email", options)
      .then((response) => response.json())
      .then((response) => console.log(response))
      .catch((err) => console.error(err));
  }

  const handleSendEmail = () => {
    createTemplate();
  };

  const [changeColor, setChangeColor] = useState(false);

  const handleFeedback = () => {
    setChangeColor(!changeColor);
  };

  const handleBadFeedback = () => {
    setSadFeedback(true);
  };

  return (
    <div>
      <div className="home">
        <div className="home_navbar">
          <NavBar />
        </div>
        <div>
          <input
            type="text"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            placeholder="Enter URL"
          />
        </div>
        <div className="home_sec">
          <div>
            <div>{url && <FetchWebsite url={url} />}</div>
          </div>
          <CookieBanner />
          <button className="card bold" type="button" onClick={handleSendEmail}>
            Send email &#8669;
          </button>
        </div>
        <div></div>

        {sadFeedback ? (
          <div
            className={`fixed w-[100%] top-[50%] h-[100%] rounded-md p-[5px] m-1 ml-[70%] bg-[#fbe9e7]`}
          >
            <iframe
              data-tally-src="https://tally.so/embed/mBprE7?alignLeft=1&hideTitle=1&transparentBackground=1&dynamicHeight=1"
              loading="lazy"
              width="30%"
              height="446"
              frameBorder="0"
              title="Feedback"
            ></iframe>

            <Script
              id="tally-js"
              src="https://tally.so/widgets/embed.js"
              onLoad={() => {
                // @ts-ignore
                Tally.loadEmbeds();
              }}
            />
          </div>
        ) : (
          <div
            className={`fixed w-[16%] top-[93%] h-[5%] rounded-md p-[5px] m-1 ml-[80%] ${
              changeColor === true ? "bg-[#e8fcd7]" : "bg-[#e6fafb]"
            }`}
          >
            <div onClick={handleFeedback}>
              <span slot="cta" className="text-[#003558] m-[3px]">
                Was this page helpful?
              </span>
              <span slot="confirmation" className="text-[#4e7a3e]">
                Thank you for your feedback!
              </span>
              <span slot="option-icon:0">
                <LikeIconSvg />
              </span>
              <span slot="option-icon:1" onClick={handleBadFeedback}>
                <DislikeIconSvg />
              </span>
            </div>
          </div>
        )}

        <div></div>
      </div>
    </div>
  );
};

export default Home;
