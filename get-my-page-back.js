// ==UserScript==
// @name         YouTube Sidebar Fix (My Page First)
// @namespace    https://github.com/taiyakipurin
// @version      1.0.0
// @description  Moves the "My Page" section above Subscriptions in YouTube sidebar
// @author       taiyakipurin
// @match        https://www.youtube.com/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=youtube.com
// @grant        none
// ==/UserScript==

let isMoving = false;

const moveSections = () => 
{
  if (isMoving) return;

  const sections = document.querySelectorAll('ytd-guide-section-renderer');

  let myPage, subs;

  sections.forEach(sec => 
  {
    if (sec.querySelector('a[href="/feed/you"]')) 
	{
      myPage = sec;
    }
    if (sec.querySelector('a[href="/feed/subscriptions"]')) 
	{
      subs = sec;
    }
  });

  if (!myPage || !subs) return;

  if (myPage.compareDocumentPosition(subs) & Node.DOCUMENT_POSITION_FOLLOWING) 
  {
    return;
  }

  isMoving = true;

  subs.parentNode.insertBefore(myPage, subs);

  isMoving = false;
};

const observer = new MutationObserver(() => 
{
  moveSections();
});

observer.observe(document.body, 
{
  childList: true,
  subtree: true
});

setTimeout(moveSections, 1000);