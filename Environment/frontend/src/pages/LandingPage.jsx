import React from 'react'
import { Link } from "react-router-dom";
import { PencilRuler, Accessibility, Store, MapPin, Shrimp, WheatOff } from 'lucide-react';

function LandingPage() {

  let featureCard = (
    <ul className="list bg-base-200 rounded-box shadow-md border border-base-300">
    
    <li className="p-4 pb-2 text-xs opacity-80 tracking-wide">Key features</li>
    
    <li className="list-row">
      <PencilRuler size={30}/>
      <div>
        <div className="text-md font-bold" tabIndex="0">Design Event Layouts</div>
        <p className="list-col-wrap text-sm">
          Create, edit, move, and delete structures to plan your event space.
        </p>
      </div>
    </li>
    
    <li className="list-row">
      <Accessibility size={34}/>
      <div>
        <div className="text-md font-bold" tabIndex="0">Highlight Accessibility Accommodations</div>
        <p className="list-col-wrap text-sm">
          Add dietary & allergen information for food vendors, mark wheelchair-accessible locations, 
          indicate attendee services, and more.
        </p>
      </div>
    </li>
    
    <li className="list-row">
      <Store size={30}/>
      <div>
        <div className="text-md font-bold" tabIndex="0">Manage Vendor Information</div>
        <p className="list-col-wrap text-sm">
          Invite vendors to provide booth information and dietary options.
        </p>
      </div>
    </li>

    <li className="list-row">
      <MapPin size={30}/>
      <div>
        <div className="text-md font-bold" tabIndex="0">Share Interactive Maps</div>
        <p className="list-col-wrap text-sm">
          Provide attendees with an interactive event map via link or generated QR code.
        </p>
      </div>
    </li>
    
  </ul>
  );

  return (
    <div className='overflow-y-auto overflow-x-hidden px-6 lg:px-10 bg-base-200'>
    {/* Hero */}
    <div className="min-h-screen pt-20 pb-5 bg-base-200">
      <div className="py-8">
        <div className="bg-base-100 rounded-xl p-6 space-y-8">
          <div className="items-center mb-20">

            <div className="flex flex-col items-center align-top gap-2 group mt-4">

              <div className="w-12 h-12 rounded-xl flex items-center justify-center">
                <img
                  src="/logo3t.png" alt="a tent with a map in inside"
                ></img>
              </div>
              <h1 className="text-2xl font-bold mb-6 md:mb-4 mx-7 text-center" tabIndex="0">Welcome to AccessMap!</h1>  

              <div className="list items-center xl:grid xl:grid-cols-3 ml-7 mr-7 md:ml-14 md:mr-14 flex flex-col md:flex-row gap-10">
                
                <div className="col-span-2 xl:mr-45 2xl:mr-60 flex flex-col gap-3 md:gap-2">
                  <h1 className="text-3xl md:text-4xl font-bold mb-2" tabIndex="0"> Accessibility-Focused Event Mapping </h1>
                  <p className="text-base-content/80 mb-4 text-md md:text-lg">
                    AccessMap helps you create interactive & informative maps,
                    simplify event layout planning, and support accessibility & dietary needs for eventgoers.
                  </p>

                  <div className="flex flex-row gap-y-2 gap-x-4 mb-8 flex flex-wrap justify-center md:justify-start">
                    <Link to={`/coordinator`} className={`btn btn-primary w-full md:w-auto rounded-lg`}> 
                      Login as a Coordinator
                    </Link>
                    <Link to={`/vendor`} className={`btn btn-soft w-full md:w-auto rounded-lg`}> 
                      Login as a Vendor
                    </Link>
                  </div>

                  <a href="https://docs.google.com/forms/d/e/1FAIpQLSe-QxjRotSg4eDOQWcEd5yfNLqkd1wPpFsM9WPHndiQzf-4dA/viewform" className="btn btn-accent h-auto rounded-xl p-3 space-y-6 font-semibold">
                    <span>
                      Vote for AccessMap in the&nbsp;
                      <span className="underline">
                      Fall 2025 Senior Design Popular Choice Vote</span> 
                      !
                    </span>
                  </a>

                </div>


                <div className="items-end">
                  {featureCard}
                </div>
                
              </div>

            </div>
          </div>
        </div>

        <footer className="footer rounded-b-xl sm:footer-horizontal bg-neutral text-neutral-content items-center font-semibold p-4">
          <aside className="grid-flow-col items-center">
            <div className="w-10 h-10 bg-base-200 rounded-md flex items-center justify-center mr-3">
              <img
                src="/logo3t.png" alt="a tent with a map in inside"
              ></img>
            </div>
            <p tabIndex="0">Created by Ann Regala, Bao Phung, Brooklyn Neubeker, Jared Smith, Natalie Tong, Primo StaAna</p>
          </aside>
        </footer>

      </div>
    </div>


    {/* Event Accessibility */}
    <div className='w-full bg-base-200 flex flex-col justify-center items-center gap-10 relative'>

          <button className="btn btn-soft rounded-md absolute bottom-0 right-0 lg:bottom-8 lg:right-8" onClick={()=>document.getElementById('my_modal_5').showModal()}>References</button>
              <dialog id="my_modal_5" className="modal modal-bottom sm:modal-middle">
              <div className="modal-box">
                  <div className="flex flex-col gap-4">
                      <p><b>1.</b> Manu, S. D., Burghardt, D., & Hauthal, E. (2025). Enhancing Accessibility of Thematic Web Maps for Visually Impaired Users. KN - Journal of Cartography and Geographic Information, 75(2), 107–121. https://doi.org/10.1007/s42489-025-00189-x</p>

                      <p><b>2.</b> Medina, J. L., Cagnin, M. I., & Paiva, D. M. B. (2015). Investigating accessibility on web-based maps. ACM SIGAPP Applied Computing Review, 15(2), 17–26. https://doi.org/10.1145/2815169.2815171</p>

                      <p><b>3.</b> Weber, L., & Lugosi, P. (2021). The event experiences of attendees with food allergies, intolerances and coeliac disease: Risk loaded value-creation/destruction. International Journal of Event and Festival Management, 12(2), 184-202. https://doi.org/10.1108/IJEFM-11-2020-0066</p>
                  </div>
                  <div className="modal-action">
                  <form method="dialog">
                      <button className="btn btn-soft rounded-md">Close</button>
                  </form>
                  </div>
              </div>
          </dialog>

          <h1 className="text-3xl lg:text-4xl font-bold mt-2 md:mt-5" tabIndex="0">Event Accessibility</h1>
          <div className="flex flex-col justify-center items-center">
              <p className="text-md md:text-lg lg:w-2/3 text-center text-base-content/80 mx-4">
                  Event attendees with specific needs often have poor experiences with organized events due to a <b>lack of information about accommodations. [3]</b>
              </p>
              <div className="stats shadow shadow-lg bg-base-100 my-10 flex flex-wrap lg:flex-nowrap">
                  <div className="stat">
                      <div className="stat-figure text-primary">
                      <Accessibility size={40}/>
                      </div>
                      <div className="stat-value">1 out of 6</div>
                      <div className="stat-desc">people are affected by a significant disability. [1]</div>
                  </div>

                  <div className="stat">
                      <div className="stat-figure text-primary">
                      <Shrimp size={40}/>
                      </div>
                      <div className="stat-value">~10%</div>
                      <div className="stat-desc">are affected by food allergies. [3]</div>
                  </div>

                  <div className="stat">
                      <div className="stat-figure text-primary">
                      <WheatOff size={40}/>
                      </div>
                      <div className="stat-value">15 - 20%</div>
                      <div className="stat-desc">are affected by food intolerances. [3]</div>
                  </div>
              </div>
              <p className="text-base-content/80 text-md md:text-lg lg:w-2/3 text-center flex flex-col-reverse lg:flex-row gap-4 lg:gap-2 justify-center items-center pb-10 lg:p-0 mx-4 mb-10 md:mb-20">
                  <div className="rounded-md bg-base-100 flex items-center justify-center p-1">
                      <img src="/logo3t.png" className="h-8 md:h-6 object-contain" />
                  </div>
                  <span><b>AccessMap</b> helps organizers create virtual event maps that address <span className="underline">attendee needs</span>.</span>
              </p>
          </div>

      </div>


      {/* Features */}
      <div className='w-full bg-base-200 flex flex-col justify-center items-center gap-2 p-8'>

          <h1 className="text-3xl lg:text-4xl font-bold mt-5 md:mt-10" tabIndex="0">Features</h1>
          <div className="flex flex-col justify-center items-center">
              <div className="flex flex-col lg:flex-row p-6 lg:p-12 gap-5 lg:gap-10 justify-center items-center">
                  <div className="flex flex-col gap-6 text-center lg:text-start mx-4">
                      <h2 className="text-2xl lg:text-3xl font-semibold" tabIndex="0">Create Events and Edit Details</h2>
                      <p className="text-md md:text-lg text-base-content/80">Create your event, view event information, and share your published map on the dashboard.</p>
                  </div>
                  <img className="lg:w-1/2 rounded-lg border" src="/C622A441-1C75-47E6-9147-9DC12B514ABE_1_201_a.jpeg"
                  alt="Image of Event Dashboard page with form for event details and preview of the event map"></img>
              </div>
              <div className="flex flex-col lg:flex-row-reverse p-6 lg:p-12 gap-10 lg:gap-20 justify-center items-center">
                  <div className="flex flex-col gap-6 text-center lg:text-start mx-4">
                      <h2 className="text-2xl lg:text-3xl font-semibold" tabIndex="0">Design Layout, Highlight Accommodations</h2>
                      <p className="text-md md:text-lg flex flex-col gap-4 text-base-content/80">
                          <span>Add, edit, move, and delete structures to plan the event space.</span>
                          <span>Include dietary information for vendors, mark wheelchair-accessible locations, indicate attendee services, and more.</span>
                      </p>
                  </div>
                  <img alt="Image of Site Planning page. Multiple structures are placed down. An info card is open in editing mode" 
                  className="lg:w-1/2 rounded-lg border" src="/D7FBED6F-D4F4-4246-B4C2-81A8271424B0_1_201_a.jpeg"></img>
              </div>
              <div className="flex flex-col lg:flex-row p-6 lg:p-12 gap-10 lg:gap-20 justify-center items-center">
                  <div className="flex flex-col gap-6 text-center lg:text-start mx-4">
                      <h2 className="text-2xl lg:text-3xl font-semibold" tabIndex="0">Manage Vendor Details</h2>
                      <p className="text-md md:text-lg flex flex-col gap-4 text-base-content/80">
                          Invite vendors to fill out stall information such as allergen and dietary details, reducing the workload for event organizers. 
                      </p>
                  </div>
                  <img className="lg:w-1/2 rounded-lg border" src="/3C8C87E5-831B-4E3D-BABC-9222ED874990_1_201_a.jpeg"
                  alt="Image of Stalls Dashboard page with one vendor highlighted."></img>
              </div>
              <div className="flex flex-col lg:flex-row-reverse p-6 lg:p-12 gap-10 lg:gap-20 justify-center items-center">
                  <div className="flex flex-col gap-6 text-center lg:text-start mx-4">
                      <h2 className="text-2xl lg:text-3xl font-semibold" tabIndex="0">Share Interactive Maps</h2>
                      <p className="text-md md:text-lg flex flex-col gap-4 text-base-content/80">
                          Provide attendees with an interactive event map via link or QR code.
                      </p>
                  </div>
                  <div className="mockup-phone w-[90vw] max-w-[390px] aspect-[390/844] mx-auto">
                      <div className="mockup-phone-camera"></div>
                      <div className="mockup-phone-display w-full h-full">
                          <img src="/EDA9FC75-C5E7-4A58-924A-5887BE83B81E.png" className="w-full h-full object-contain"
                          alt="Image of mobile view of a published map. An info card for a food stall is open."/>
                      </div>
                  </div>
              </div>
          </div>

      </div>
    </div>
  )
}

export default LandingPage