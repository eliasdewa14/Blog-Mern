import { Button } from "flowbite-react";

export default function CallToAction() {
  return (
    <div className="flex flex-col sm:flex-row border border-slate-500 justify-center items-center rounded-tl-3xl rounded-br-3xl p-3 bg-amber-100 dark:bg-slate-700">
      <div className="flex-1 justify-center flex flex-col items-center">
        <h2 className="text-3xl">Want to learn JS</h2>
        <p className="text-gray-500 my-2">Check out these resources to learn more about JavaScript</p>
        <Button gradientDuoTone="purpleToPink" className="rounded-tl-xl rounded-bl-none w-full">
          <a href="https://github.com/eliasdewa14/javascript-projects" target="_blank" rel="noopener noreferrer">JS Projects</a>
        </Button>
      </div>
      <div className="flex-1 p-7">
        <img src="https://miro.medium.com/v2/resize:fit:1400/1*LyZcwuLWv2FArOumCxobpA.png"/>
      </div>
    </div>
  )
}
