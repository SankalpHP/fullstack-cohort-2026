export function createTiffinPlan({ name, mealType = "veg", days = 30 } = {}) {
  if (
    typeof name !== "string" ||
    name.trim() === "" ||
    typeof days !== "number" ||
    days <= 0
  ) {
    return null;
  }

  const rates = { veg: 80, nonveg: 120, jain: 90 };
  if (!rates.hasOwnProperty(mealType)) return null;

  const dailyRate = rates[mealType];

  return {
    name,
    mealType,
    days,
    dailyRate,
    totalCost: dailyRate * days,
  };
}

export function combinePlans(...plans) {
  if (!plans || plans.length === 0) return null;

  let totalCustomers = 0;
  let totalRevenue = 0;
  const mealBreakdown = {};

  for (const plan of plans) {
    if (!plan) continue;

    totalCustomers++;
    totalRevenue += plan.totalCost;

    mealBreakdown[plan.mealType] =
      (mealBreakdown[plan.mealType] || 0) + 1;
  }

  return { totalCustomers, totalRevenue, mealBreakdown };
}

export function applyAddons(plan, ...addons) {
  if (!plan || typeof plan !== "object") return null;

  let extraCost = 0;
  const addonNames = [];

  for (const addon of addons) {
    if (addon && typeof addon.price === "number") {
      extraCost += addon.price;
      addonNames.push(addon.name);
    }
  }

  const newDailyRate = plan.dailyRate + extraCost;
  const newTotalCost = newDailyRate * plan.days;

  return {
    ...plan,
    dailyRate: newDailyRate,
    totalCost: newTotalCost,
    addonNames,
  };
}