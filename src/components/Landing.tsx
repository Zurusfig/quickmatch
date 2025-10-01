export function Landing(){
    return <div className="flex flex-col gap-[1rem] w-[100%] justify-center items-center">
        <div>
            <h1 className="text-5xl font-black">QuickMatcH</h1>
        </div>
        <div className="text-2xl font">
            HighScore: 
        </div>
        <button className="bg-amber-400 p-2 w-[20%] rounded-lg text-xl hover:bg-amber-300 cursor-pointer hover:text-gray-600">
            Start
        </button>
        <p className="text-grey-700 text-sm">Find the matching symbols. Score as much as you can in 30s!</p>
    </div> 
}