import { faCoins } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { JSX } from "preact/jsx-runtime"
import { ShipItemType } from ".."
import Item from "../../commons/Item"
import './ShipItem.css'


type SearchItemProps = {
    data: ShipItemType
    actions?: JSX.Element
}

const ShipItem = ({ data: ship, actions }: SearchItemProps) => {
    return (
        <Item actions={ actions }>
            <>
                <div class="ship_info">
                    <img class="ship_preview" loading="lazy" src={ ship.img } onError={ (event) => (event.target as HTMLImageElement).src = ship.altimg } />
                    <span class="ship_title">
                        <div class="ship_id">{ ship.extension.short + ship.numid }</div>
                        <div class="ship_name">{ ship.name }</div>
                    </span>
                    <img class="faction_img" loading="lazy" src={ ship.faction.img } />
                    <span class="ship_points"><FontAwesomeIcon icon={ faCoins } /><b> { ship.points }</b></span>
                    <span class="ship_cargo"><img src="/public/img/svg/cargo_nobg.svg" /> { ship.crew && ship.crew.length > 0 && ship.crew.length + '/' }{ ship.cargo }</span>
                    <span class="ship_"></span>
                </div>
                {/* <ul class="crew_list items">
                    {
                        ship.crew && ship.crew.map( (crew, index) => 
                            <SearchCrewItem data={ crew } key={ index } />
                        )
                    }
                </ul> */}
            </>
        </Item>
    );
}

export default ShipItem;