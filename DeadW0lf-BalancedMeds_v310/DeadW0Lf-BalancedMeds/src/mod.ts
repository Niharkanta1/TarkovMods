import { DependencyContainer } from "tsyringe";

import { IPreSptLoadMod } from "@spt/models/external/IPreSptLoadMod";
import { IPostDBLoadMod } from "@spt/models/external/IPostDBLoadMod";
import { InstanceManager } from "./Refs/InstanceManager";
import { BaseClasses } from "@spt/models/enums/BaseClasses";
import { DatabaseServer } from "@spt/servers/DatabaseServer";
import { IDatabaseTables } from "@spt/models/spt/server/IDatabaseTables";
import { ILogger } from "@spt/models/spt/utils/ILogger";
import { LogTextColor } from "@spt/models/spt/logging/LogTextColor";

class BalancedMeds implements IPreSptLoadMod, IPostDBLoadMod {

    private mod = require("../package.json");
    private modLabel = `[${this.mod.name}@${this.mod.version}]`;
    private instance: InstanceManager = new InstanceManager();
    private drugconfig = require("../config/Drugs.json");
    private medicalconfig = require("../config/Medicals.json");
    private medkitconfig = require("../config/Medkits.json");
    private stimconfig = require("../config/Stimulators.json");
    private stimsID = require("../config/stimsID.json");

    private globalbuffs: any;

    public preSptLoad(container: DependencyContainer): void {
        this.instance.preSptLoad(container, "Balanced Meds by DeadW0Lf");
    }

    postDBLoad(container: DependencyContainer): void {
        const logger = container.resolve<ILogger>("WinstonLogger");
        logger.log(`${this.modLabel} Loading....`, LogTextColor.GREEN);
        const databaseServer = container.resolve<DatabaseServer>("DatabaseServer");
        const tables: IDatabaseTables = databaseServer.getTables();
        const items = Object.values(tables.templates.items);
        const locales = tables.locales.global;

        this.globalbuffs = tables.globals.config.Health.Effects.Stimulator.Buffs;

        for (const item in items) {
            const itemProps = items[item]._props;
            const itemId = items[item]._id;
            //const itemNameLocal = `${locales["en"][`${itemId} Name`]}`;

            // logger.log(`${this.modLabel} changing value for: item ${itemId}:: ${itemNameLocal}`, LogTextColor.GREEN);

            if (items[item]._parent == BaseClasses.STIMULATOR && this.stimconfig[itemId]) {
                itemProps.medUseTime = this.stimconfig[itemId]['medUseTime'];
                itemProps.MaxHpResource = this.stimconfig[itemId]["MaxHpResource"];
                itemProps.hpResourceRate = this.stimconfig[itemId]["hpResourceRate"];
                if (itemProps.StimulatorBuffs) {
                    this.replacestims(itemId, this.stimconfig[itemId]["effects_buffs"]);
                }
            }

            else if (items[item]._parent == BaseClasses.MEDKIT && this.medkitconfig[itemId]) {
                itemProps.medUseTime = this.medkitconfig[itemId]['medUseTime']
                itemProps.MaxHpResource = this.medkitconfig[itemId]["MaxHpResource"];
                itemProps.hpResourceRate = this.medkitconfig[itemId]["hpResourceRate"];
                if (itemProps.effects_damage) {
                    itemProps.effects_damage = this.medkitconfig[itemId]["effects_damage"];
                }

            }

            else if (items[item]._parent == BaseClasses.MEDICAL && this.medicalconfig[itemId]) {
                itemProps.medUseTime = this.medicalconfig[itemId]['medUseTime']
                itemProps.MaxHpResource = this.medicalconfig[itemId]["MaxHpResource"];
                itemProps.hpResourceRate = this.medicalconfig[itemId]["hpResourceRate"];
                if (itemProps.effects_damage) {
                    itemProps.effects_damage = this.medicalconfig[itemId]["effects_damage"];
                }
            }

            else if (items[item]._parent == BaseClasses.DRUGS && this.drugconfig[itemId]) {
                itemProps.medUseTime = this.drugconfig[itemId]['medUseTime'];
                itemProps.MaxHpResource = this.drugconfig[itemId]["MaxHpResource"];
                itemProps.hpResourceRate = this.drugconfig[itemId]["hpResourceRate"];
                if (itemProps.effects_damage) {
                    itemProps.effects_damage = this.drugconfig[itemId]["effects_damage"];
                }
                if (itemProps.effects_health) {
                    itemProps.effects_health = this.drugconfig[itemId]["effects_health"];
                }
            }

        }

        logger.log(`${this.modLabel} Load Successful...`, LogTextColor.GREEN);
    }

    private replacestims(id: string, array: string[]): void {
        const buff = Object.getOwnPropertyDescriptor(this.stimsID, id)
        if (buff != undefined) {
            this.globalbuffs[`${buff.value}`] = array;
        }
    }
}

export const mod = new BalancedMeds();
