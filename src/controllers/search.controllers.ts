import { Request, Response } from 'express';
import { RaceDetail } from '../models/RaceDetail/RaceDetail.model';
import { Driver } from '../models/Driver/Driver.model';
import { Team } from '../models/Team/Team.model';
import { Race } from '../models/Race/Race.model';

export const search = {
    // API SEARCH THEO THU HANG
    searchMutiple: async (req: Request, res: Response) => {
        let { year, type, detail } = req.params;

        detail = detail.replace(/-/g, " ");
        let query = {}
        let options: any = []
        // Thu hang Driver
        if (type === "drivers") {
            query = {
                driver: { $regex: detail, $options: 'i' },
                year: parseInt(year),
            }
            const optionsDetail = {
                $project: {
                    grandPrix: "$map",
                    date: { $arrayElemAt: ["$mapObject.date", 0] } ,
                    car: "$car",
                    pos: "$pos",
                    pts: "$points"
                }
            }
            options.push(optionsDetail);
        }
        // Thu hang Team
        if (type === "teams") {
            query = {
                car: { $regex: detail, $options: 'i' },
                year: parseInt(year),
            }
            const optionDetail = {
                $group: {
                    _id: "$map",
                    date: { $first: { $arrayElemAt: ["$mapObject.date", 0] } },
                    grandPrix: { $first: "$map" },
                    point: { $sum: "$points" }
                }
            }
            options.push(optionDetail);
        }
        if (type === "races") {
            query = {
                map: { $regex: detail, $options: 'i' },
                year: parseInt(year),
            }
            const optionDetail = {
                $project: {
                    no: "$no",
                    driver: "$driver",
                    car: "$car",
                    laps: "$laps",
                    pos: "$pos",
                    time: "$time",
                    points: "$points",
                    year: "$year",
                    map: "$map",
                }
            }
            options.push(optionDetail);
        }
        const pipeline = [
            {
                $match: query
            },
            {
                $lookup: {
                    from: "races",
                    localField: "map",
                    foreignField: "grand",
                    let: { map: "$map", year: "$year" },
                    pipeline: [
                        {
                            $match: {
                                $expr: {
                                    $and: [
                                        { $eq: ["$grand", "$$map"] },
                                        { $eq: ["$year", "$$year"] },
                                    ]
                                }
                            }
                        },
                    ],

                    as: "mapObject",
                }
            },

        ];
        const pipelineActive = pipeline.concat(options);
        RaceDetail.aggregate(pipelineActive).then(result => {
            if (!!result) {
                return res.json({ code: "success", data: result });
            }
            return res.json({ msg: "err" });
        })



    },
    // API SEARCH
    search: async (req: Request, res: Response) => {
        const { year, type } = req.params;
        if (type === "drivers") {
            const option = "pos name nationality team points"
            Driver.find({ year: year }, option).then(result => {
                if (!!result) {
                    return res.json({ code: "success", data: result });
                }
                return res.json({ msg: "err" });
            })
        }
        if (type === "teams") {
            const option = "pos name points"
            Team.find({ year: year }, option).then(result => {
                if (!!result) {
                    return res.json({ code: "success", data: result });
                }
                return res.json({ msg: "err" });
            })
        }
        if (type === "races") {
            const options = 'grand date winner car laps time';
            Race.find({ year: year }, options).then(result => {
                if (!!result) {
                    return res.json({ code: "success", data: result });
                }
                return res.json({ msg: "err" });
            })
        }
    }
}