import { DependencyContainer } from "tsyringe";

import { IPreSptLoadMod } from "@spt/models/external/IPreSptLoadMod";
import { InstanceManager } from "./Refs/InstanceManager";
import { ILogger } from "@spt/models/spt/utils/ILogger";
import { IDatabaseTables } from "@spt/models/spt/server/IDatabaseTables";
import { DatabaseServer } from "@spt/servers/DatabaseServer";
import { BaseClasses } from "@spt/models/enums/BaseClasses";
import { LogTextColor } from "@spt/models/spt/logging/LogTextColor";

class Mod implements IPreSptLoadMod {
    private mod = require("../package.json");
    private modLabel = `[${this.mod.name}@${this.mod.version}]`;
    private instance: InstanceManager = new InstanceManager();

    public preSptLoad(container: DependencyContainer): void {
        this.instance.preSptLoad(container, "LOG TO CONSOLE");
    }

    postDBLoad(container: DependencyContainer): void {
        const databaseServer = container.resolve<DatabaseServer>("DatabaseServer");
        const tables: IDatabaseTables = databaseServer.getTables();
        const items = Object.values(tables.templates.items);
        const locales = tables.locales.global;

        const logger = container.resolve<ILogger>("WinstonLogger");
        // logger.log(`${this.modLabel} Loading....`, LogTextColor.GREEN)

        const categories = [
            { name: "KEY", baseClass: BaseClasses.KEY_MECHANICAL, color: LogTextColor.GREEN },
            { name: "KEY_CARDS", baseClass: BaseClasses.KEYCARD, color: LogTextColor.YELLOW }
        ];

        const detailedCategories = new Set([
            "KEY",
            "KEY_CARDS"
        ]);

        // Group items by their categories
        const groupedItems: { [key: string]: any[] } = {};

        for (const category of categories) {
            groupedItems[category.name] = [];
        }

        for (const item in items) {
            const itemProps = items[item]._props;
            const itemId = items[item]._id;
            const itemNameLocal = `${locales["en"][`${itemId} Name`]}`;
            tables.locales.global.locales['en'][`${itemId} ShortName`] = `My ${locales["en"][`${itemId} ShortName`]}`;
            const itemShortLocal = `${locales["en"][`${itemId} ShortName`]}`;
            const parent = items[item]._parent;

            for (const category of categories) {
                if (parent === category.baseClass) {
                    groupedItems[category.name].push({
                        id: itemId,
                        name: itemNameLocal,
                        usage: itemProps.MaximumNumberOfUsage,
                        shortName: itemShortLocal
                    });
                    break;
                }
            }
        }

        // Log items by category
        for (const category of categories) {
            const itemsInCategory = groupedItems[category.name];
            for (const item of itemsInCategory) {
                if (detailedCategories.has(category.name)) {
                    logger.log(
                        `${this.modLabel} ${category.name} item: ${item.id} :: ${item.name} :: ${item.usage} :: ${item.shortName}`,
                        category.color
                    );
                } else {
                    logger.log(
                        `${this.modLabel} ${category.name} item: ${item.id} :: ${item.name} :: ${item.usage}`,
                        category.color
                    );
                }
            }
        }



        logger.log(`${this.modLabel} Load Successful...`, LogTextColor.GREEN);
    }
}

export const mod = new Mod();
