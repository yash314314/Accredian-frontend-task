/* eslint-disable prefer-const */
import { useState, ChangeEvent, FormEvent } from "react";

const ReferEarn = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState({
    referrerName: "",
    referrerEmail: "",
    refereeName: "",
    refereeEmail: ""
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const toggleModal = () => setIsOpen(!isOpen);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const validateForm = () => {
    let newErrors: Record<string, string> = {};
    Object.keys(formData).forEach((key) => {
      if (!formData[key as keyof typeof formData]) {
        newErrors[key] = "This field is required";
      }
    });
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async(e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (validateForm()) {
     
      try {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/referral`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(formData),
          });
          const data = await response.json();
          if(response.ok){
             alert("Referral submitted successfully!"); setIsOpen(false);
          }
          else{
            alert(data.error)
          }
      } catch (error) {
        console.error(error);
        alert("something went wrong");
      }
     
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-6 rounded-lg shadow-lg text-center">
        <h1 className="text-2xl font-bold">Refer & Earn</h1>
        <p className="text-gray-600 mt-2">Invite your friends and earn rewards!</p>
        <button onClick={toggleModal} className="mt-4 px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600">
          Refer Now
        </button>
      </div>

      {isOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <h2 className="text-xl font-bold mb-4">Refer a Friend</h2>
            <form onSubmit={handleSubmit} className="space-y-3">
              <input type="text" name="referrerName" placeholder="Your Name" className="w-full p-2 border rounded" value={formData.referrerName} onChange={handleChange} />
              {errors.referrerName && <p className="text-red-500 text-sm">{errors.referrerName}</p>}
              <input type="email" name="referrerEmail" placeholder="Your Email" className="w-full p-2 border rounded" value={formData.referrerEmail} onChange={handleChange} />
              {errors.referrerEmail && <p className="text-red-500 text-sm">{errors.referrerEmail}</p>}
              <input type="text" name="refereeName" placeholder="Friend's Name" className="w-full p-2 border rounded" value={formData.refereeName} onChange={handleChange} />
              {errors.refereeName && <p className="text-red-500 text-sm">{errors.refereeName}</p>}
              <input type="email" name="refereeEmail" placeholder="Friend's Email" className="w-full p-2 border rounded" value={formData.refereeEmail} onChange={handleChange} />
              {errors.refereeEmail && <p className="text-red-500 text-sm">{errors.refereeEmail}</p>}
              <div className="flex justify-end space-x-2">
                <button type="button" onClick={toggleModal} className="px-4 py-2 bg-gray-400 text-white rounded-lg">Cancel</button>
                <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded-lg">Submit</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ReferEarn;
