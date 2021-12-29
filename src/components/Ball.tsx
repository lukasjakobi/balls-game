import BallInterface from "../interfaces/BallInterface";

import {BadgeCheckIcon} from '@heroicons/react/solid'

export default function Ball(props: BallInterface) {
    return (
        <div
            className={"ball"}
            style={{backgroundColor: props.color.hex}}
        >
            {props.active && (
                <div className="flex h-full w-full ">
                    <BadgeCheckIcon className="text-white text-bold w-5 h-5 m-auto" />
                </div>
            )}
        </div>
    );
}