import { DependencyContainer } from "tsyringe";

import { IPostDBLoadMod } from "@spt/models/external/IPostDBLoadMod";
import { CustomItemService } from "@spt/services/mod/CustomItemService";
import { NewItemFromCloneDetails } from "@spt/models/spt/mod/NewItemDetails";
import { IPostSptLoadMod } from "@spt/models/external/IPostSptLoadMod";
import { DatabaseServer } from "@spt/servers/DatabaseServer";
import { Traders } from "@spt/models/enums/Traders";

export enum Ids {
    KAR98K_WEAP = "d5ff2d1f6c759baef1d11ee0",
    KAR98k_BARREL = "81bfdfc6166713effa89206b",
    KAR98K_STOCK = "de63c05e51c2e585417d8a42",
    KAR98K_SLING = "5ea81fe2d26cc87a275d611e",
    KAR98K_TRIGGER = "f7041e1a9ee783614d202ae0"
}

class Mod implements IPostDBLoadMod, IPostSptLoadMod {
    public postDBLoad(container: DependencyContainer): void {
        const customItem = container.resolve<CustomItemService>("CustomItemService");
        const databaseServer = container.resolve<DatabaseServer>("DatabaseServer");
        const db = databaseServer.getTables();
        const SKR = db.traders[Traders.SKIER];

        const kar98k: NewItemFromCloneDetails = {
            itemTplToClone: "5bfea6e90db834001b7347f3", // Remington Model 700 7.62x51 bolt-action sniper rifle
            overrideProperties: {
                "Prefab": {
                    "path": "WEAP/KAR98/weapon_remington_model_700_762x51_container.bundle",
                    "rcid": ""
                },
                "Slots": [
                    {
                        "_name": "mod_barrel",
                        "_id": "b902094197e0dd493817bedd",
                        "_parent": "d5ff2d1f6c759baef1d11ee0",
                        "_props": {
                            "filters": [
                                {
                                    "Shift": 0,
                                    "Filter": [
                                        Ids.KAR98k_BARREL
                                    ]
                                }
                            ]
                        },
                        "_required": true,
                        "_mergeSlotWithChildren": false,
                        "_proto": "55d30c4c4bdc2db4468b457e"
                    },
                    {
                        "_id": "a393904e62655ace02bae356",
                        "_mergeSlotWithChildren": false,
                        "_name": "mod_stock",
                        "_parent": "d5ff2d1f6c759baef1d11ee0",
                        "_props": {
                            "filters": [
                                {
                                    "Filter": [
                                        Ids.KAR98K_STOCK
                                    ],
                                    "Shift": 0
                                }
                            ]
                        },
                        "_proto": "55d30c4c4bdc2db4468b457e",
                        "_required": true
                    },
                    {
                        "_id": "cebf3e0f03a791f53d3bd4a4",
                        "_mergeSlotWithChildren": false,
                        "_name": "mod_tactical",
                        "_parent": "d5ff2d1f6c759baef1d11ee0",
                        "_props": {
                            "filters": [
                                {
                                    "Filter": [
                                        Ids.KAR98K_TRIGGER
                                    ],
                                    "Shift": 0
                                }
                            ]
                        },
                        "_proto": "55d30c4c4bdc2db4468b457e",
                        "_required": false
                    },
                    {
                        "_id": "f4e0e0a11eafbe0bc27e1690",
                        "_mergeSlotWithChildren": false,
                        "_name": "mod_magazine",
                        "_parent": "d5ff2d1f6c759baef1d11ee0",
                        "_props": {
                            "filters": [
                                {
                                    "Filter": [
                                        Ids.KAR98K_SLING
                                    ],
                                    "Shift": 0
                                }
                            ]
                        },
                        "_proto": "55d30c4c4bdc2db4468b457e",
                        "_required": false
                    },

                ]
            },
            parentId: "5447b6254bdc2dc3278b4568", //Sniper Rifles
            newId: Ids.KAR98K_WEAP, //The new id of our cloned item
            fleaPriceRoubles: 50000, //Self explanatary
            handbookPriceRoubles: 42500,
            handbookParentId: "5b5f78e986f77447ed5636b1", //Handbook Parent Id refers to the category the gun will be under
            //you see those side box tab thing that only select gun under specific icon? Handbook parent can be found in Aki_Data\Server\database\templates.
            locales: {
                en: {
                    name: "Karabiner 98k 8mm Mauser bolt-action sniper rifle",
                    shortName: "Kar98k",
                    description: "The Karabiner 98 kurz (also Karabiner 98k, Kar98k or K98k ) is a bolt-action rifle chambered for the 8mm Mauser cartridge",
                },
            },
        };

        customItem.createItemFromClone(kar98k); //Basically calls the function and tell the server to add our Cloned new item into the server

        const kar98k_barrel: NewItemFromCloneDetails = {
            itemTplToClone: "5de65547883dde217541644b",
            overrideProperties: {
                "Prefab": {
                    "path": "MOD/KAR98/MOD_KAR98_BARREL.bundle",
                    "rcid": ""
                },
                "ExtraSizeLeft": 3,
                "Recoil": -15
            },
            parentId: "555ef6e44bdc2de9068b457e", //Barrel
            newId: Ids.KAR98k_BARREL,
            fleaPriceRoubles: 15200,
            handbookPriceRoubles: 12000,
            handbookParentId: "5b5f78e986f77447ed5636b1",
            locales: {
                en: {
                    name: "Kar98k 600mm Factory Issue Barrel",
                    shortName: "Kar98k Barrel",
                    description: "A standard 600 mm (23.62 in) long barrel for the Kar98k.",
                },
            }
        }

        customItem.createItemFromClone(kar98k_barrel);

        const kar98k_stock: NewItemFromCloneDetails = {
            itemTplToClone: "5bfeb32b0db834001a6694d9",
            overrideProperties: {
                "Prefab": {
                    "path": "MOD/KAR98/MOD_KAR98_STOCK.bundle",
                    "rcid": ""
                },
                "ExtraSizeLeft": 2,
                "Recoil": -10,
                "Ergonomics": 5,
            },
            parentId: "55818a594bdc2db9688b456a", //Stock
            newId: Ids.KAR98K_STOCK,
            fleaPriceRoubles: 20000,
            handbookPriceRoubles: 15000,
            handbookParentId: "5b5f78e986f77447ed5636b1",
            locales: {
                en: {
                    name: "Kar98k Plywood Laminate Stock",
                    shortName: "Kar98k Stock",
                    description: "Plywood laminates are stronger and resist warping better than the conventional wooden one-piece patterns, though are slightly heavier as a result.",
                },
            }
        }

        customItem.createItemFromClone(kar98k_stock);

        const kar98k_sling: NewItemFromCloneDetails = {
            itemTplToClone: "57d17e212459775a1179a0f5",
            overrideProperties: {
                "Prefab": {
                    "path": "MOD/KAR98/MOD_KAR98_SLING.bundle",
                    "rcid": ""
                },
                "Ergonomics": 1,
            },
            parentId: "55818b224bdc2dde698b456f", //Mount
            newId: Ids.KAR98K_SLING,
            fleaPriceRoubles: 15200,
            handbookPriceRoubles: 12000,
            handbookParentId: "5b5f78e986f77447ed5636b1",
            locales: {
                en: {
                    name: "Kar98k Shoulder Sling",
                    shortName: "Kar98k Sling",
                    description: "A basic fabric strap mad to help infantryman carry rifles while freeing up the hands.",
                },
            }
        }

        customItem.createItemFromClone(kar98k_sling);

        const kar98k_trigger: NewItemFromCloneDetails = {
            itemTplToClone: "5bfea7ad0db834001c38f1ee",
            overrideProperties: {
                "Prefab": {
                    "path": "MAG/KAR98/MAG_KAR98_5RND.bundle",
                    "rcid": ""
                },
                "Ergonomics": 1,
                "RaidModdable": false,
            },
            parentId: "5448bc234bdc2d3c308b4569", //Mag
            newId: Ids.KAR98K_TRIGGER,
            fleaPriceRoubles: 6000,
            handbookPriceRoubles: 5000,
            handbookParentId: "5b5f78e986f77447ed5636b1",
            locales: {
                en: {
                    name: "Kar 98k Trigger Assembly",
                    shortName: "K98 Trigger",
                    description: "A factory issue trigger assembly for Kar98k. Very durable and light however feeds the gun reliably.",
                },
            }
        }

        customItem.createItemFromClone(kar98k_trigger);

        // Trader
        const kar98k_items = [
            {
                "_id": "d5ff2d1f6c759baef1d11ee0",
                "_tpl": "d5ff2d1f6c759baef1d11ee0",
                "parentId": "hideout",
                "slotId": "hideout",
                "upd": {
                    "UnlimitedCount": true,
                    "StackObjectsCount": 99
                }
            },
            {
                "_id": "81bfdfc6166713effa89206b",
                "_tpl": "81bfdfc6166713effa89206b",
                "parentId": "d5ff2d1f6c759baef1d11ee0",
                "slotId": "mod_barrel"
            },
            {
                "_id": "de63c05e51c2e585417d8a42",
                "_tpl": "de63c05e51c2e585417d8a42",
                "parentId": "d5ff2d1f6c759baef1d11ee0",
                "slotId": "mod_stock"
            },
            {
                "_id": "5ea81fe2d26cc87a275d611e",
                "_tpl": "5ea81fe2d26cc87a275d611e",
                "parentId": "d5ff2d1f6c759baef1d11ee0",
                "slotId": "mod_tactical"
            },
            {
                "_id": "f7041e1a9ee783614d202ae0",
                "_tpl": "f7041e1a9ee783614d202ae0",
                "parentId": "d5ff2d1f6c759baef1d11ee0",
                "slotId": "mod_magazine"
            },
            {
                "_id": "8668800414b422f7c28c948e",
                "_tpl": "d5ff2d1f6c759baef1d11ee0",
                "parentId": "hideout",
                "slotId": "hideout",
                "upd": {
                    "UnlimitedCount": true,
                    "StackObjectsCount": 99
                }
            },
            {
                "_id": "b3230f161eea0d0916b5c902",
                "_tpl": "81bfdfc6166713effa89206b",
                "parentId": "hideout",
                "slotId": "hideout",
                "upd": {
                    "UnlimitedCount": true,
                    "StackObjectsCount": 99
                }
            },
            {
                "_id": "893b387f9b8abf1eda564339",
                "_tpl": "f7041e1a9ee783614d202ae0",
                "parentId": "hideout",
                "slotId": "hideout",
                "upd": {
                    "UnlimitedCount": true,
                    "StackObjectsCount": 99
                }
            },
            {
                "_id": "43fb12723eadf81dbdb03bad",
                "_tpl": "5ea81fe2d26cc87a275d611e",
                "parentId": "hideout",
                "slotId": "hideout",
                "upd": {
                    "UnlimitedCount": true,
                    "StackObjectsCount": 99
                }
            },
            {
                "_id": "5aae57a693e3dd62c2e824ef",
                "_tpl": "de63c05e51c2e585417d8a42",
                "parentId": "hideout",
                "slotId": "hideout",
                "upd": {
                    "UnlimitedCount": true,
                    "StackObjectsCount": 99
                }
            },


        ];
        SKR.assort.items.push(...kar98k_items);
    }

    //Check if our item is in the server or not
    public postSptLoad(container: DependencyContainer): void {
        const db = container.resolve<DatabaseServer>("DatabaseServer");
        const item = db.getTables().templates.items;

        console.log(item[Ids.KAR98K_WEAP]._props);
    }
}

export const mod = new Mod();
