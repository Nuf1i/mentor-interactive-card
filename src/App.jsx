import { useState } from 'react'

function App() {
  const [card, setCard] = useState({
    name: "",
    number: "",
    month: "",
    year: "",
    cvv: "",
  })

  const [nameError, setNameError] = useState("");
  const [numberError, setNumberError] = useState("");
  const [monthError, setMonthError] = useState("");
  const [yearError, setYearError] = useState("");
  const [cvvError, setCvvError] = useState("");

  const [pass, setPass] = useState(false)

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    switch (name) {
      case "name":
        setNameError(!/^[a-zA-Z\s]*$/.test(value));
        break;
      case "number":
        setNumberError(!/^\d{0,16}$/.test(value));
        break;
      case "month":
        setMonthError(!/^\d{2}$/.test(value));
        break;
      case "year":
        setYearError(!/^\d{2}$/.test(value));
        break;
      case "cvv":
        setCvvError(!/^\d{3}$/.test(value));
        break;
      default:
    }
    setCard(prevState => ({ ...prevState, [name]: value.slice(0, 16) }));
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    setNameError(!card.name);
    setNumberError(!card.number || !/^\d{16}$/.test(card.number));
    setMonthError(!card.month || !/^\d{2}$/.test(card.month));
    setYearError(!card.year || !/^\d{2}$/.test(card.year));
    setCvvError(!card.cvv || !/^\d{3}$/.test(card.cvv));

    if (!card.name || !card.number || !card.month || !card.year || !card.cvv) {
      return;
    }
    setPass(true);
  }


  return (
    <div className='flex flex-col w-full overflow-hidden lg:flex-row bg-slate-100'>
      {/* Left */}
      <div className='w-full h-64 bg-cover left-side lg:min-h-screen bg-slate-100 lg:w-6/12'>

        <div className='relative w-full h-full max-w-lg mx-auto'>
          <div className='flex drop-shadow-xl flex-col front-card z-30 bg-cover p-4 absolute h-44 rounded-lg w-[22rem] translate-y-12 left-7 bottom-0 lg:h-52 lg:w-96 lg:top-24 lg:translate-x-16 lg:left-1/3'>
            <img src='/public/card-logo.svg' className='block object-fill h-8 w-14' />

            <div className='flex flex-col gap-3 mt-auto'>
              <h1 className='text-3xl tracking-wider lg:tracking-widest text-slate-200'>{card.number ? card.number : "0000 0000 0000 0000"}</h1>
              <div className='flex justify-between'>
                <p className='text-sm tracking-wider text-slate-200'>
                  {
                    card?.name ? card?.name : "YOUR NAME"
                  }

                </p>

                <p className='mr-2 text-sm text-slate-200'>
                  {card.month ? card.month : "00"}
                  /
                  {card.year ? card.year : "00"}
                </p>
              </div>
            </div>
          </div>

          <div className='back-card drop-shadow-xl text-right py-16 pr-12 z-10 bg-cover h-44 w-[22rem] right-6 top-6 absolute rounded-lg lg:h-52 lg:w-96 lg:translate-x-16 lg:top-96 lg:left-1/2'>
            <h1 className='mt-[1.1rem] lg:mt-7 text-base font-base tracking-wide text-slate-200'>
              {card.cvv ? card.cvv : "123"}
            </h1>
          </div>
        </div>
      </div>

      <div className='flex justify-center w-full lg:min-h-screen lg:items-center'>

        {/* FORM */}
        {
          pass ?
            <div className='flex flex-col items-center gap-3 mt-24 lg:-translate-y-14 lg:gap-3 w-96'>
              <img src='/public/icon-complete.svg' className='w-24 h-24' />
              <h1 className='font-semibold text-black'>THANK YOU</h1>
              <p className='text-slate-600'>We have added your card Details</p>
              <button onClick={() => setPass(false)} className='px-16 py-2 w-full bg-[#1c073d] text-slate-100 text-center rounded-lg'>Continue</button>
            </div>
            :
            <form className='flex flex-col gap-3 mt-24 lg:-translate-y-14 lg:gap-4 w-96' onSubmit={handleSubmit}>
              <div className='flex flex-col gap-2'>
                <label htmlFor="name" className='font-mono leading-5 text-slate-700'>CARDHOLDER NAME</label>
                <input name="name" placeholder='e.g Jane Appleaed' type="text" className={`px-4 py-2 text-gray-400 rounded-lg ${nameError && "border-red-500 border"}`} onChange={handleInputChange} />
                {nameError && <p className="text-xs text-red-500">only letters</p>}
              </div>

              <div className='flex flex-col gap-2'>
                <label htmlFor="number" className='font-mono leading-5 text-slate-700'>CARD NUMBER</label>
                <input name="number" placeholder='e.g 1234567812345678' type="text" className={`px-4 py-2 text-gray-400 rounded-lg ${numberError && "border-red-500 border"}`} onChange={handleInputChange} />
                {numberError && <p className="text-xs text-red-500">Only 16-digit number</p>}
              </div>

              <div className='flex flex-col w-full gap-2'>
                <label htmlFor="" className='font-mono leading-5 text-slate-700'>EXP. DATE (MM/YY) </label>
                <div className='flex gap-4'>
                  <div className='relative'>
                    <input name="month" placeholder='MM' type="text" className={`w-16 px-2 py-2 text-gray-400 rounded-lg ${monthError && "border-red-500 border"}`} onChange={handleInputChange} />
                    {monthError && <p className="text-xs text-red-500">2-digit number</p>}
                  </div>

                  <div className='relative'>
                    <input name="year" placeholder='YY' type="text" className={`w-16 px-2 py-2 text-gray-400 rounded-lg ${yearError && "border-red-500 border"}`} onChange={handleInputChange} />
                    {yearError && <p className="text-xs text-red-500">2-digit number</p>}
                  </div>

                  <div className='relative flex flex-col'>
                    <input name="cvv" placeholder='e.g 123' type="text" className={`w-full px-2 py-1 text-gray-400 rounded-lg ${cvvError && "border-red-500 border"}`} onChange={handleInputChange} />
                    {cvvError && <p className="absolute inset-x-0 text-xs text-red-500 -bottom-3">3-digit number</p>}
                  </div>
                </div>
              </div>

              <button type='submit' className='px-16 py-2 bg-[#1c073d] text-slate-100 text-center rounded-lg'>Confirm</button>
            </form>
        }
      </div>
      {/* Right */}
    </div>
  )
}

export default App