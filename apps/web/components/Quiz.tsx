
export default function Quiz() {
    return (
        <div className="flex items-center justify-center h-screen bg-slate-100">
            <div className="flex flex-col">
                <h1 className="font-bold text-4xl my-6">The HTML Quiz</h1>
                <div className="flex justify-between mb-8">
                    <div className="rounded-full bg-indigo-500 text-white font-bold w-10 h-10 flex items-center justify-center cursor-pointer">1</div>
                    <div className="rounded-full bg-[#BAC3D7] text-white font-bold w-10 h-10 flex items-center justify-center cursor-pointer">2</div>
                    <div className="rounded-full bg-[#BAC3D7] text-white font-bold w-10 h-10 flex items-center justify-center cursor-pointer">3</div>
                    <div className="rounded-full bg-[#BAC3D7] text-white font-bold w-10 h-10 flex items-center justify-center cursor-pointer">4</div>
                    <div className="rounded-full bg-[#BAC3D7] text-white font-bold w-10 h-10 flex items-center justify-center cursor-pointer">5</div>
                    <div className="rounded-full bg-[#BAC3D7] text-white font-bold w-10 h-10 flex items-center justify-center cursor-pointer">6</div>
                    <div className="rounded-full bg-[#BAC3D7] text-white font-bold w-10 h-10 flex items-center justify-center cursor-pointer">7</div>
                    <div className="rounded-full bg-[#BAC3D7] text-white font-bold w-10 h-10 flex items-center justify-center cursor-pointer">8</div>
                    <div className="rounded-full bg-[#BAC3D7] text-white font-bold w-10 h-10 flex items-center justify-center cursor-pointer">9</div>
                    <div className="rounded-full bg-[#BAC3D7] text-white font-bold w-10 h-10 flex items-center justify-center cursor-pointer">10</div>

                </div>
                <div className="bg-white shadow-2xl rounded-2xl w-[600px]" id="quiz">
                    <div className="p-4">
                        <h2 id="question" className="font-bold text-2xl my-4">Question Text</h2>
                        <ul>
                            <li className="">
                                <input type="radio" name="answer" id="a" className="cursor-pointer" />
                                <label htmlFor="a" id="a_text" className="text-xl m-4 cursor-pointer">Answer</label>
                            </li>

                            <li className="">
                                <input type="radio" name="answer" id="b" className="cursor-pointer" />
                                <label htmlFor="b" id="a_text" className="text-xl m-4 cursor-pointer">Answer</label>
                            </li>

                            <li className="">
                                <input type="radio" name="answer" id="c" className="cursor-pointer" />
                                <label htmlFor="c" id="a_text" className="text-xl m-4 cursor-pointer">Answer</label>
                            </li>

                            <li className="">
                                <input type="radio" name="answer" id="d" className="cursor-pointer" />
                                <label htmlFor="d" id="a_text" className="text-xl m-4 cursor-pointer">Answer</label>
                            </li>
                        </ul>
                    </div>
                    <button id="submit" className="block w-full bg-indigo-500 py-4 text-white text-xl rounded-b-2xl">Submit</button>
                </div>
            </div>
        </div>
    )
}
