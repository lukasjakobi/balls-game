import {useParams} from 'react-router-dom';
import ShareInterface from "../interfaces/ShareInterface";
import ShareGame from "../components/ShareGame";

function Play() {
    let { hash } = useParams();

    if (hash === undefined) {
        return <div className="error">error</div>;
    }

    let json = atob(hash);
    let share: ShareInterface = JSON.parse(json);

    if (!share) {
        return <div className="error">error</div>;
    }

    return (
        <section id="share">
            <ShareGame id={share.id} name={share.name} glasses={share.glasses} />
        </section>
    )
}

export default Play;