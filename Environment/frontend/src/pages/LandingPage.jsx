import React from 'react'
import { Link } from "react-router-dom";

function LandingPage() {
  return (
    <div className="min-h-screen pt-20 bg-base-200">
        <div className="mx-4 p-4 py-8">
            <div className="bg-base-100 rounded-xl p-6 space-y-8">
                <div>LandingPage: BAO MAGIC!!!!
                <Link to={`/coordinator`} className={`btn btn-soft ml-4`}> 
                Coordinator
              </Link>
              <Link to={`/vendor`} className={`btn btn-soft ml-4`}> 
                Vendor
              </Link>
              </div>

            </div>
        </div>
    </div>
  )
}

export default LandingPage