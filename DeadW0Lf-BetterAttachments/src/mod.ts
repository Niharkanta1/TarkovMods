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
        this.instance.preSptLoad(container, "Better Attachments");
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
            const itemNameLocal = `${locales["en"][`${itemId} Name`]}`;

            // FOREGRIPS
            if (items[item]._parent == BaseClasses.FOREGRIP) {
                this.updateErgo(itemId, "FOREGRIP", this.modConfig.betterForegrips, itemNameLocal, itemProps, logger);
                this.updateRecoil(itemId, "FOREGRIP", this.modConfig.betterForegrips, itemNameLocal, itemProps, logger);
            }

            // SIGHT
            if (items[item]._parent == BaseClasses.IRON_SIGHT) {
                this.updateErgo(itemId, "IRON_SIGHT", this.modConfig.betterSights, itemNameLocal, itemProps, logger);
            }

            if (items[item]._parent == BaseClasses.COMPACT_COLLIMATOR) {
                this.updateErgo(itemId, "COMPACT_COLLIMATOR", this.modConfig.betterSights, itemNameLocal, itemProps, logger);
            }

            if (items[item]._parent == BaseClasses.COLLIMATOR) {
                this.updateErgo(itemId, "COLLIMATOR", this.modConfig.betterSights, itemNameLocal, itemProps, logger);
            }

            if (items[item]._parent == BaseClasses.OPTIC_SCOPE) {
                this.updateErgo(itemId, "OPTIC_SCOPE", this.modConfig.betterSights, itemNameLocal, itemProps, logger);
            }

            if (items[item]._parent == BaseClasses.SPECIAL_SCOPE) {
                this.updateErgo(itemId, "SPECIAL_SCOPE", this.modConfig.betterSights, itemNameLocal, itemProps, logger);
            }

            if (items[item]._parent == BaseClasses.ASSAULT_SCOPE) {
                this.updateErgo(itemId, "ASSAULT_SCOPE", this.modConfig.betterSights, itemNameLocal, itemProps, logger);
            }

            // MUZZLE
            if (items[item]._parent == BaseClasses.COMPENSATOR) {
                this.updateErgo(itemId, "COMPENSATOR", this.modConfig.betterMuzzles, itemNameLocal, itemProps, logger);
                this.updateRecoil(itemId, "COMPENSATOR", this.modConfig.betterMuzzleRecoil, itemNameLocal, itemProps, logger);
            }

            if (items[item]._parent == BaseClasses.FLASH_HIDER) {
                this.updateErgo(itemId, "FLASH_HIDER", this.modConfig.betterMuzzles, itemNameLocal, itemProps, logger);
                this.updateRecoil(itemId, "FLASH_HIDER", this.modConfig.betterMuzzleRecoil, itemNameLocal, itemProps, logger);
            }

            if (items[item]._parent === '550aa4dd4bdc2dc9348b4569') {
                this.updateErgo(itemId, "COMB_MUZZLE_DEVICE", this.modConfig.betterMuzzles, itemNameLocal, itemProps, logger);
                this.updateRecoil(itemId, "COMB_MUZZLE_DEVICE", this.modConfig.betterMuzzleRecoil, itemNameLocal, itemProps, logger);
            }

            if (items[item]._parent == BaseClasses.SILENCER) {
                this.updateErgo(itemId, "SILENCER", this.modConfig.betterSuppressors, itemNameLocal, itemProps, logger);
                this.updateRecoil(itemId, "SILENCER", this.modConfig.betterSuppressorRecoil, itemNameLocal, itemProps, logger);
                this.updateHeating(itemId, "SILENCER", this.modConfig.betterSuppressorHeating, itemNameLocal, itemProps, logger);
            }

            // FlashLight
            if (items[item]._parent == BaseClasses.FLASHLIGHT) {
                this.updateErgo(itemId, "FLASHLIGHT", this.modConfig.betterMuzzles, itemNameLocal, itemProps, logger);
            }


            // LightLaser
            if (items[item]._parent == BaseClasses.LIGHT_LASER_DESIGNATOR) {
                this.updateErgo(itemId, "LIGHT_LASER_DESIGNATOR", this.modConfig.betterMuzzles, itemNameLocal, itemProps, logger);
            }


            // Tactical Combo
            if (items[item]._parent == BaseClasses.TACTICAL_COMBO) {
                this.updateErgo(itemId, "TACTICAL_COMBO", this.modConfig.betterTacticals, itemNameLocal, itemProps, logger);
            }

            // STOCK
            if (items[item]._parent == BaseClasses.STOCK) {
                this.updateErgo(itemId, "STOCK", this.modConfig.betterStocks, itemNameLocal, itemProps, logger);
                this.updateRecoil(itemId, "STOCK", this.modConfig.betterStocks, itemNameLocal, itemProps, logger);
            }

            // Handguards
            if (items[item]._parent == BaseClasses.HANDGUARD) {
                this.updateErgo(itemId, "HANDGUARD", this.modConfig.betterHandGuards, itemNameLocal, itemProps, logger);
                this.updateRecoil(itemId, "HANDGUARD", this.modConfig.betterHandGuards, itemNameLocal, itemProps, logger);
            }

            // Pistol Grips
            if (items[item]._parent == BaseClasses.PISTOL_GRIP) {
                this.updateErgo(itemId, "PISTOL_GRIP", this.modConfig.betterPistolGrips, itemNameLocal, itemProps, logger);
            }

        }
        logger.log(`${this.modLabel} Load Successful...`, LogTextColor.GREEN);
    }

    updateHeating(itemId: string, type: string, isApplicable: any, itemNameLocal: string, itemProps: IProps, logger: ILogger) {
        if (itemProps.DurabilityBurnModificator && itemProps.HeatFactor && this.modConfig.value[itemId]) {
            //logger.log(`${this.modLabel} ${type} item: ${itemId} :: ${itemNameLocal} :: ${JSON.stringify(itemProps.DurabilityBurnModificator)} ::  ${JSON.stringify(itemProps.HeatFactor)} ::  ${JSON.stringify(itemProps.CoolFactor)}`, LogTextColor.GREEN);
            itemProps.DurabilityBurnModificator = isApplicable && this.modConfig.value[itemId].durabilityBurn_updated ? this.modConfig.value[itemId].durabilityBurn_updated : itemProps.DurabilityBurnModificator;
            itemProps.HeatFactor = isApplicable && this.modConfig.value[itemId].heatFactor_updated ? this.modConfig.value[itemId].heatFactor_updated : itemProps.HeatFactor;
            itemProps.CoolFactor = isApplicable && this.modConfig.value[itemId].coolFactor_updated ? this.modConfig.value[itemId].coolFactor_updated : itemProps.CoolFactor;
        }
    }


    updateErgo(itemId: string, type: string, isApplicable: boolean, itemNameLocal: string, itemProps: IProps, logger: ILogger) {
        if (itemProps.Ergonomics && this.modConfig.value[itemId]) {
            itemProps.Ergonomics = isApplicable ? this.modConfig.value[itemId].ergonomics_updated : this.modConfig.value[itemId].ergonomics;
            // logger.log(`${this.modLabel} ${type} item: ${itemId} :: ${itemNameLocal} :: ${JSON.stringify(itemProps.Ergonomics)}`, LogTextColor.GREEN);
        }
    }


    updateRecoil(itemId: string, type: string, isApplicable: boolean, itemNameLocal: string, itemProps: IProps, logger: ILogger) {
        if (itemProps.Recoil && this.modConfig.value[itemId]) {
            itemProps.Recoil = isApplicable ? this.modConfig.value[itemId].recoil_updated : this.modConfig.value[itemId].recoil;
            // logger.log(`${this.modLabel} ${type} item: ${itemId} :: ${itemNameLocal} :: ${itemProps.Ergonomics} :: ${itemProps.Recoil}`, LogTextColor.GREEN);
        }

    }
}

export const mod = new BetterAttachments();

