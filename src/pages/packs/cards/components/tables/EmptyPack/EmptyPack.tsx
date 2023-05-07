import {Button} from "common/components/Button/Button";
import React from "react";

type PropsType = {
    callback: () => void
    isMyPack: boolean
}

export const CardsOfEmptyPack = ({callback, isMyPack}:PropsType) => {
    return (
        <>

            {isMyPack ? <><p>This pack is empty. Click add new card to fill this pack</p>
            <Button label={"Add new card"} onClick={callback}/></> : <p>This pack is empty.</p>}
        </>
    );
};