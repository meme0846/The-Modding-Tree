addLayer("r", {
        name: "ranks", // This is optional, only used in a few places, If absent it just uses the layer id.
        symbol: "R", // This appears on the layer's node. Default is the id with the first letter capitalized
        position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
        startData() { return {
            unlocked: true,
		points: new Decimal(1),
		time: new Decimal(0),
        }},
        color: "#4BDC13",
        requires:10, // Can be a function that takes requirement increases into account
        resource: "ranks", // Name of prestige currency
	base: 2,
        baseResource: "distance", // Name of resource prestige is based on
        baseAmount() {return player.points}, // Get the current amount of baseResource
        type: "static", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
        exponent: 2, // Prestige currency exponent
        gainMult() { // Calculate the multiplier for main currency from bonuses
            mult = new Decimal(1)

            return mult
        },
        gainExp() { // Calculate the exponent on main currency from bonuses
		exp=new Decimal(1)
		if (player.t.points.gte(1)) exp = exp.times(1.25)
		if (player.t.points.gte(3)) exp = exp.times(Decimal.pow(1.1,player.t.points))		
            return exp
        },
        row: 0, // Row the layer is in on the tree (0 is the first row)
        hotkeys: [
            {key: "r", description: "Rank Reset", onPress(){if (canReset(this.layer)) doReset(this.layer)}},
        ],
        layerShown(){return true},
	update(diff){
	player.r.time=player.r.time.add(diff)
	},
	onReset() {player.r.time=new Decimal(0)},
})
addLayer("t", {
        name: "tiers", // This is optional, only used in a few places, If absent it just uses the layer id.
        symbol: "T", // This appears on the layer's node. Default is the id with the first letter capitalized
        position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
	branches:["r"],
        startData() { return {
            unlocked: true,
			points: new Decimal(0),
        }},
        color: "#4BDC13",
        requires: 1, // Can be a function that takes requirement increases into account
        resource: "tiers", // Name of prestige currency
        baseResource: "ranks", // Name of resource prestige is based on
        baseAmount() {return player.r.points}, // Get the current amount of baseResource
        type: "static", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
        exponent: 2, // Prestige currency exponent
	base: 1,
        gainMult() { // Calculate the multiplier for main currency from bonuses
            mult = new Decimal(1)
            return mult
        },
        gainExp() { // Calculate the exponent on main currency from bonuses
            return new Decimal(1)
        },
        row: 1, // Row the layer is in on the tree (0 is the first row)
        hotkeys: [
            {key: "t", description: "Tier reset", onPress(){if (canReset(this.layer)) doReset(this.layer)}},
        ],
        layerShown(){return true},
})
addLayer("a", {
        startData() { return {
            unlocked: true,
        }},
        color: "yellow",
        row: "side",
        layerShown() {return true}, 
        tooltip() { // Optional, tooltip displays when the layer is locked
            return ("Achievements")
        },
        achievements: {
            rows: 2,
            cols: 3,
            11: {
                name: "Quick Sprint",
                done() { return player.points.gte(100) },
                tooltip: "Reach 100 distance",
            },
		12: {
                name: "Better Shoes",
                done() { return player.r.points.gte(2) },
                tooltip: "Rank up",
            },
		13: {
                name: "Extreme Workout",
                done() { return player.t.points.gte(1) },
                tooltip: "Tier up",
            },
		21: {
                name: "Driving for Hours",
                done() { return player.points.gte(5e5) },
                tooltip: "Travel 500 km",
            },
		22: {
                name: "Oil change",
                done() { return player.r.points.gte(8) },
                tooltip: "Reach rank 8",
            },
		23: {
                name: "Three's the Lucky Number",
                done() { return player.t.points.gte(3) },
                tooltip: "Reach tier 3",
            },
        },
        midsection: [
            "achievements",
        ]
    }, 
)
