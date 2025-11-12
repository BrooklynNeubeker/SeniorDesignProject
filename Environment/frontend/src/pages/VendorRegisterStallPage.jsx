import { useState, useEffect, React } from "react";
import { Link } from "react-router-dom";
import { axiosInstance } from "../lib/axios";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../store/useAuthStore";
import { useParams } from "react-router-dom";

const VendorRegisterStallPage = () => {
  const { authUser } = useAuthStore();
  const { stallId } = useParams();
  const [stall, setStall] = useState(null);
  const navigate = useNavigate();
  const [loadingStall, setLoadingStall] = useState(true);
  const [showFoodInfo, setShowFoodInfo] = useState(false);
  const [stallRegistered, setStallRegistered] = useState(false);
  const [formData, setFormData] = useState({
    description: "",
    vendor: "", // company name
    stallType: "", // food or nonFood
    //menu: "",
    tagList: [],
    //
  });


  //from bao
  const [tagsArray, setTagsArray] = useState([]) 

  const toggleTag = (tagName) =>
      setTagsArray(prev => 
        prev.includes(tagName)                //does tagName exist in the array
        ? prev.filter(tag => tag !== tagName) // if it does remove it
        : [...prev, tagName]                  // if it doesn't add it
      );

  const dietaryTags = [
        "Vegan",
        "Vegetarian",
        "Gluten-Free",
        "Nut-Free",
        "Dairy-Free",
        "Halal",
        "Kosher"
    ]
  
  useEffect(() => {
     
      const fetchStall = async () => {
      try {
          const res =  await axiosInstance.get(`/events/stalls/${stallId}`);
          setStall(res.data);
          if(res.data.onboardingStatus === "vendorRegistered"){
            setStallRegistered(true);
          }else{setStallRegistered(false)}
          console.log("in FetchStall:",res.data);
      } catch (err) {
          console.error("Failed to fetch stall", err);
      } finally {
          setLoadingStall(false);
      }
      };
      fetchStall();
  }, [stallId]);

  useEffect(() => {
    if (stall) {
      setFormData((prev) => ({ 
        ...prev, 
        name: stall.name, 
        email: stall.email, 
      }));
    }
  }, [stall]);

  const handleSubmit = async (e) => {
      e.preventDefault();
      const payload = { 
        ...formData, 
        tagList: tagsArray
       };
      

      try {
        const res = await axiosInstance.put(`/events/stalls/update/${stallId}`, payload);
        alert("event created");
        console.log("updated stall:", res.data);
        navigate(`/vendor/${stallId}`);
      } catch (err) {
        alert("error");
        console.error("stall update failed:", err);
      }
    };

    let setTagsComponent;

    setTagsComponent = (
     <div>
        <span>Dietary Accommodations:</span>
        <ul className="space-y-2 mt-3">
          {dietaryTags.map(tag => (
            <li key={tag} className="flex items-center gap-3">
              <span className="min-w-30">{tag}</span>
              <input
                type="checkbox"
                className="checkbox checkbox-primary"
                checked={tagsArray.includes(tag)}
                onChange={() => toggleTag(tag)}
              />
            </li>
          ))}
        </ul>
     </div>
    )

    let submitButton;
    if(!stallRegistered){
      submitButton = (
        <div className="flex justify-end">
            <button type="submit" className="btn btn-primary btn-outline">
                Submit Registration
            </button>
        </div>
      )
    }else{
      navigate(`/vendor/${stallId}`);
    }
  
    if(loadingStall){
        return (
            <div className="min-h-screen grid place-items-center">
                <span className="loading loading-spinner loading-lg" />
            </div>
        )
    }

  return (
          <div className="h-screen pt-20">
            <div className="container flex flex-1 flex-col p-16 mx-auto bg-base-100/50">
              <div className="max-w-md justify-left space-y-6">

                <h1 className="text-2xl font-bold">Register Stall</h1>

                <form onSubmit={handleSubmit} className="space-y-6">

                  {/* Stall name */}
                  <div className="form-control">
                    <label className="label">
                      <span className="label-text font-medium">Stall Name</span>
                    </label>
                    <div className="relative mt-3">
                      <input
                        className={`input input-bordered w-full`}
                        value={formData.name}
                        readOnly
                      />
                    </div>
                  </div>

                  {/* Stall email */}
                  <div className="form-control">
                    <label className="label">
                      <span className="label-text font-medium">Contact E-mail</span>
                    </label>
                    <div className="relative mt-3">
                      <input
                        className={`input input-bordered w-full`}
                        value={formData.email}
                        readOnly
                      />
                    </div>
                  </div>

                  {/* Stall Description */}
                  <div className="form-control">
                    <label className="label">
                      <span className="label-text font-medium">Description</span>
                    </label>
                    <div className="relative mt-3">
                      <textarea
                        className={`textarea textarea-bordered w-full h-32 resize-none`}
                        value={formData.description}
                        placeholder="Write a brief description about your stall!"
                        onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                      />
                    </div>
                  </div>

                  {/* Vendor Name */}
                  <div className="form-control">
                    <label className="label">
                      <span className="label-text font-medium">Company Name</span>
                    </label>
                    <div className="relative mt-3">
                      <input
                        className={`input input-bordered w-full`}
                        value={formData.vendor}
                        placeholder="What entity owns the stall?"
                        onChange={(e) => setFormData({ ...formData, vendor: e.target.value })}
                      />
                    </div>
                  </div>

                  {/* Stall Type */}
                  <div className="form-control">
                    <label className="label">
                      <span className="label-text font-medium">Do you sell food?</span>
                    </label>
                    <div className="relative mt-3">
                      <input
                        type="checkbox"
                        className="toggle toggle-primary"
                        checked= {formData.stallType === "food"}
                        onChange={(e) => {
                          const isChecked = e.target.checked;
                          setShowFoodInfo(isChecked);
                          setFormData((prev) => ({
                            ...prev,
                            stallType: isChecked ? "food" : "nonFood",
                          }));
                        }}
                      />
                    </div>
                  </div>

                  {showFoodInfo && setTagsComponent}
                  {submitButton}



                </form>
              </div>
            </div>
          </div>
  )
}

export default VendorRegisterStallPage