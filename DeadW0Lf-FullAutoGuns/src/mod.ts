import { DependencyContainer } from "tsyringe";

import { IPreSptLoadMod } from "@spt/models/external/IPreSptLoadMod";
import { IPostDBLoadMod } from "@spt/models/external/IPostDBLoadMod";
import { InstanceManager } from "./Refs/InstanceManager";
import { BaseClasses } from "@spt/models/enums/BaseClasses";
import { DatabaseServer } from "@spt/servers/DatabaseServer";
import { IDatabaseTables } from "@spt/models/spt/server/IDatabaseTables";
import { ILogger } from "@spt/models/spt/utils/ILogger";
import { LogTextColor } from "@spt/models/spt/logging/LogTextColor";
import { IProps } from "@spt/models/eft/common/tables/ITemplateItem";

class BetterAttachments implements IPreSptLoadMod, IPostDBLoadMod {

    private mod = require("../package.json");
    private modLabel = `[${this.mod.name}@${this.mod.version}]`;
    private instance: InstanceManager = new InstanceManager();
    private modConfig = require("../config/config.json");

    public preSptLoad(container: DependencyContainer): void {
        this.instance.preSptLoad(container, "Full Automatic Guns");
    }

    postDBLoad(container: DependencyContainer): void {
        const databaseServer = container.resolve<DatabaseServer>("DatabaseServer");
        const tables: IDatabaseTables = databaseServer.getTables();
        const items = Object.values(tables.templates.items);
        const locales = tables.locales.global;

        const logger = container.resolve<ILogger>("WinstonLogger");
        // logger.log(`${this.modLabel} Loading....`, LogTextColor.GREEN)

        for (const item in items) {
            const itemProps = items[item]._props;
            const itemId = items[item]._id;
            //const itemNameLocal = `${locales["en"][`${itemId} Name`]}`;
            //const fireModeSwitchSound = '';
            const weaponFireType = ['single', 'fullauto'];

            if (this.isModifiableGun(items[item]._parent) && itemProps.weapFireType && this.isSingleFireOnly(itemProps.weapFireType)) {
                if (this.modConfig[itemId] && this.modConfig[itemId].enabled) {
                    itemProps.weapFireType = weaponFireType;
                    // TODO: Set Firemode switch sound
                    //itemProps
                    itemProps.bFirerate = this.modConfig[itemId].bFirerate;
                }
            }

        }
        logger.log(`${this.modLabel} Load Successful...`, LogTextColor.GREEN);
    }

    isModifiableGun(_parent: string) {
        return _parent == BaseClasses.ASSAULT_CARBINE || _parent == BaseClasses.ASSAULT_RIFLE
            || _parent == BaseClasses.SMG || _parent == BaseClasses.PISTOL || _parent == BaseClasses.MARKSMAN_RIFLE;
    }

    isSingleFireOnly(fireTypes: Array<string>): boolean {
        return !fireTypes.includes("fullauto");
    }
}

export const mod = new BetterAttachments();

