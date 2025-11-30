import React from 'react'
import { Link } from "react-router-dom";
import { PencilRuler, Accessibility, Store, MapPin } from 'lucide-react';

function LandingPage() {

  let featureCard = (
    <ul className="list bg-base-100 rounded-box shadow-md">
    
    <li className="p-4 pb-2 text-xs opacity-80 tracking-wide">Key features</li>
    
    <li className="list-row">
      <PencilRuler size={30}/>
      <div>
        <div className="text-md font-bold">Design Event Layouts</div>
        <p className="list-col-wrap text-sm">
          Create, edit, move, and delete structures to plan your event space.
        </p>
      </div>
    </li>
    
    <li className="list-row">
      <Accessibility size={34}/>
      <div>
        <div className="text-md font-bold">Highlight Accessibility Accommodations</div>
        <p className="list-col-wrap text-sm">
          Add dietary & allergen information for food vendors, mark wheelchair-accessible locations, 
          indicate attendee services, and more.
        </p>
      </div>
    </li>
    
    <li className="list-row">
      <Store size={30}/>
      <div>
        <div className="text-md font-bold">Manage Vendor Information</div>
        <p className="list-col-wrap text-sm">
          Invite vendors to provide booth information and dietary options.
        </p>
      </div>
    </li>

    <li className="list-row">
      <MapPin size={30}/>
      <div>
        <div className="text-md font-bold">Share Interactive Maps</div>
        <p className="list-col-wrap text-sm">
          Provide attendees with an interactive event map via link or generated QR code.
        </p>
      </div>
    </li>
    
  </ul>
  );

  return (
    <div className="min-h-screen pt-20 bg-base-200">
      <div className="max-w-10/12 mx-auto p-4 py-8">
        <div className="bg-base-100 rounded-xl p-6 space-y-8">
          <div className="items-center mb-14">

            <div className="flex flex-col items-center align-top gap-2 group mt-4">

              <div className="w-12 h-12 rounded-xl flex items-center justify-center">
                <img
                  src="/logo3t.png" alt="a tent with a map in inside"
                ></img>
              </div>
              <h1 className="text-xl font-bold mb-2">Welcome to AccessMap!</h1>  

              <div className="list items-center xl:grid xl:grid-cols-3 ml-7 mr-7 md:ml-14 md:mr-14">
                
                <div className="col-span-2 xl:mr-45 2xl:mr-60">
                  <h1 className="text-3xl md:text-4xl font-bold mb-2"> Accessibility-Focused Event Mapping </h1>
                  <p className="text-base-content/80 mb-4">
                    AccessMap helps you create interactive & informative maps,
                    simplify event layout planning, and support accessibility & dietary needs for eventgoers.
                  </p>

                  <div className="flex flex-row gap-y-2 gap-x-4 mb-8">
                    <Link to={`/coordinator`} className={`btn btn-primary`}> 
                      Login
                    </Link>
                    <Link to={`/vendor`} className={`btn btn-soft`}> 
                      Login as a Vendor
                    </Link>
                  </div>

                  <div className="badge badge-info rounded-xl p-5 space-y-6 font-semibold">
                    <span>
                      Vote for AccessMap in the&nbsp;
                      <a className="link" href="https://docs.google.com/forms/d/e/1FAIpQLSe-QxjRotSg4eDOQWcEd5yfNLqkd1wPpFsM9WPHndiQzf-4dA/viewform">
                      Fall 2025 Senior Design Popular Choice Vote</a> 
                      !
                    </span>
                  </div>

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
            <div className="w-10 h-10 bg-base-200 rounded-md flex items-center justify-center">
              <img
                src="/logo3t.png" alt="a tent with a map in inside"
              ></img>
            </div>
            <p>Created by Ann Regala, Bao Phung, Brooklyn Neubeker, Jared Smith, Natalie Tong, Primo StaAna</p>
          </aside>
        </footer>

      </div>
    </div>
  )
}

export default LandingPage