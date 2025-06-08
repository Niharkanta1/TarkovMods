import { DependencyContainer } from "tsyringe";

import { IPreSptLoadMod } from "@spt/models/external/IPreSptLoadMod";
import { IPostDBLoadMod } from "@spt/models/external/IPostDBLoadMod";
import { InstanceManager } from "./Refs/InstanceManager";
import { BaseClasses } from "@spt/models/enums/BaseClasses";
import { DatabaseServer } from "@spt/servers/DatabaseServer";
import { IDatabaseTables } from "@spt/models/spt/server/IDatabaseTables";
import { ILogger } from "@spt/models/spt/utils/ILogger";
import { LogTextColor } from "@spt/models/spt/logging/LogTextColor";

class UsefulFoodsAndDrinks implements IPreSptLoadMod, IPostDBLoadMod {

    private mod = require("../package.json");
    private modLabel = `[${this.mod.name}@${this.mod.version}]`;
    private instance: InstanceManager = new InstanceManager();
    private modConfig = require("../config/config.json");

    public preSptLoad(container: DependencyContainer): void {
        this.instance.preSptLoad(container, "Useful Foods And Drinks");
    }

    postDBLoad(container: DependencyContainer): void {
        const databaseServer = container.resolve<DatabaseServer>("DatabaseServer");
        const tables: IDatabaseTables = databaseServer.getTables();
        const items = Object.values(tables.templates.items);
        const locales = tables.locales.global;

        const logger = container.resolve<ILogger>("WinstonLogger");
        //logger.log(`${this.modLabel} Loading....`, LogTextColor.GREEN)

        for (const item in items) {
            const itemProps = items[item]._props;
            const itemId = items[item]._id;
            //const itemNameLocal = `${locales["en"][`${itemId} Name`]}`;

            if (items[item]._parent == BaseClasses.FOOD && itemProps.effects_health) {
                itemProps.MaxResource = this.modConfig[itemId]?.MaxResource;
                if (itemProps.effects_health) {
                    for (const effect in itemProps.effects_health) {
                        //logger.log(`${this.modLabel} effect: ${effect}`, LogTextColor.GREEN)
                        if (itemProps.effects_health.hasOwnProperty(effect) && effect === 'Hydration') {
                            itemProps.effects_health[effect].value = this.modConfig[itemId]?.effects_health?.Hydration?.value;
                        } else if (itemProps.effects_health.hasOwnProperty(effect) && effect === 'Energy') {
                            itemProps.effects_health[effect].value = this.modConfig[itemId]?.effects_health?.Energy?.value;
                        }
                    }
                }
                //logger.log(`${this.modLabel} item: ${itemId} :: ${itemNameLocal} :: ${JSON.stringify(itemProps)}`, LogTextColor.GREEN);
            }
            else if (items[item]._parent == BaseClasses.DRINK) {
                itemProps.MaxResource = this.modConfig[itemId]?.MaxResource;
                for (const effect in itemProps.effects_health) {
                    //logger.log(`${this.modLabel} effect: ${effect}`, LogTextColor.GREEN)
                    if (itemProps.effects_health.hasOwnProperty(effect) && effect === 'Hydration') {
                        itemProps.effects_health[effect].value = this.modConfig[itemId]?.effects_health?.Hydration?.value;
                    } else if (itemProps.effects_health.hasOwnProperty(effect) && effect === 'Energy') {
                        itemProps.effects_health[effect].value = this.modConfig[itemId]?.effects_health?.Energy?.value;
                    }
                }
                //logger.log(`${this.modLabel} item: ${itemId} :: ${itemNameLocal} :: ${JSON.stringify(itemProps)}`, LogTextColor.GREEN);
            }
        }
        logger.log(`${this.modLabel} Load Successful...`, LogTextColor.GREEN);
    }
}

export const mod = new UsefulFoodsAndDrinks();
