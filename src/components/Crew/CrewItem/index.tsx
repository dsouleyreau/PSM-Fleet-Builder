import { faCoins } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { JSX } from "preact/jsx-runtime"
import { CrewItemType } from ".."
import Item from "../../commons/Item"
import './CrewItem.css'


type SearchItemProps = {
    data: CrewItemType
    actions?: JSX.Element
}

const CrewItem = ({ data: crew, actions }: SearchItemProps) => {
    return (
        <Item actions={ actions }>
            <>
                <div class="crew_info">
                    <img class="crew_preview" loading="lazy" src={ crew.img } onError={ (event) => (event.target as HTMLImageElement).src = crew.altimg } />
                    <span class="crew_title">
                        <div class="crew_id">{ crew.extension.short + crew.numid }</div>
                        <div class="crew_name">{ crew.name }</div>
                    </span>
                    <img class="faction_img" loading="lazy" src={ crew.faction.img } />
                    <span class="crew_points"><FontAwesomeIcon icon={ faCoins } />&nbsp;&nbsp;{ crew.points }</span>
                </div>
            </>
        </Item>
    );
}

export default CrewItem;