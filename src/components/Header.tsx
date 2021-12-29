import {ArrowCircleLeftIcon, MenuIcon, RewindIcon, ViewGridAddIcon} from '@heroicons/react/solid'

interface HeaderInterface {
    resetsMax: number,
    resets: number
}

function Header(props: HeaderInterface)
{
    return <div className="header">
        {/* MENU BUTTON */}
        <div className="basis-1/4">
            <div className="button">
                <MenuIcon className="text-white w-5 h-5 m-auto" />
            </div>
        </div>
        {/* RESET BUTTON */}
        <div className="basis-1/4">
            <div className="button">
                <RewindIcon className="text-white w-5 h-5 m-auto" />
            </div>
        </div>
        {/* UNDO BUTTON */}
        <div className="basis-1/4">
            <div className="button" id="btn_retries">
                <ArrowCircleLeftIcon className="text-white w-5 h-5 m-auto mr-0" />
                <span className="m-auto ml-1 text-lg">{props.resetsMax - props.resets}</span>
            </div>
        </div>
        {/* ADD GLASS */}
        <div className="basis-1/4">
            <div className="button">
                <ViewGridAddIcon className="text-white w-5 h-5 m-auto" />
            </div>
        </div>
    </div>;
}

export default Header;