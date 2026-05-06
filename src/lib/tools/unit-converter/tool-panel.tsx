"use client";

import * as React from "react";
import { ArrowLeftRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { useLocaleContext } from "@/components/i18n/locale-context";

const linearUnitGroups = {
  length: {
    defaultFrom: "m",
    defaultTo: "ft",
    units: [
      { key: "m", factor: 1 },
      { key: "km", factor: 1000 },
      { key: "cm", factor: 0.01 },
      { key: "mm", factor: 0.001 },
      { key: "in", factor: 0.0254 },
      { key: "ft", factor: 0.3048 },
      { key: "yd", factor: 0.9144 },
      { key: "mi", factor: 1609.344 },
    ],
  },
  weight: {
    defaultFrom: "kg",
    defaultTo: "lb",
    units: [
      { key: "kg", factor: 1 },
      { key: "g", factor: 0.001 },
      { key: "mg", factor: 0.000001 },
      { key: "lb", factor: 0.45359237 },
      { key: "oz", factor: 0.02834952 },
    ],
  },
  area: {
    defaultFrom: "sqm",
    defaultTo: "sqft",
    units: [
      { key: "sqm", factor: 1 },
      { key: "sqkm", factor: 1000000 },
      { key: "sqcm", factor: 0.0001 },
      { key: "sqmm", factor: 0.000001 },
      { key: "ha", factor: 10000 },
      { key: "ac", factor: 4046.85642 },
      { key: "sqin", factor: 0.00064516 },
      { key: "sqft", factor: 0.09290304 },
      { key: "sqyd", factor: 0.83612736 },
      { key: "sqmi", factor: 2589988.11 },
    ],
  },
} as const;

const temperatureGroup = {
  defaultFrom: "c",
  defaultTo: "f",
  units: [{ key: "c" }, { key: "f" }, { key: "k" }],
} as const;

type LinearCategory = keyof typeof linearUnitGroups;
type UnitCategory = LinearCategory | "temperature";

const categories: UnitCategory[] = ["length", "weight", "temperature", "area"];

function formatNumber(value: number) {
  if (!Number.isFinite(value)) return "";
  return Number.isInteger(value)
    ? value.toString()
    : Number.parseFloat(value.toPrecision(10)).toString();
}

function getCategoryDefaults(category: UnitCategory) {
  return category === "temperature"
    ? temperatureGroup
    : linearUnitGroups[category];
}

function getUnitOptions(category: UnitCategory) {
  return getCategoryDefaults(category).units;
}

function convertTemperature(value: number, from: string, to: string) {
  let celsius = value;
  if (from === "f") celsius = ((value - 32) * 5) / 9;
  if (from === "k") celsius = value - 273.15;

  if (to === "f") return (celsius * 9) / 5 + 32;
  if (to === "k") return celsius + 273.15;
  return celsius;
}

function convertLinear(value: number, from: string, to: string, category: LinearCategory) {
  const group = linearUnitGroups[category];
  const fromUnit = group.units.find((unit) => unit.key === from);
  const toUnit = group.units.find((unit) => unit.key === to);
  if (!fromUnit || !toUnit) return Number.NaN;
  return (value * fromUnit.factor) / toUnit.factor;
}

function convertValue(value: string, from: string, to: string, category: UnitCategory) {
  if (!value) return "";
  const numericValue = Number(value);
  if (!Number.isFinite(numericValue)) return "";

  const result =
    category === "temperature"
      ? convertTemperature(numericValue, from, to)
      : convertLinear(numericValue, from, to, category);

  return formatNumber(result);
}

export default function UnitConverterPanel() {
  const { dictionary: d } = useLocaleContext();
  const ui = d.toolUi["unit-converter"];

  const [category, setCategory] = React.useState<UnitCategory>("length");
  const [fromUnit, setFromUnit] = React.useState("m");
  const [toUnit, setToUnit] = React.useState("ft");
  const [fromValue, setFromValue] = React.useState("1");
  const [toValue, setToValue] = React.useState("3.28084");

  const handleFromChange = (val: string) => {
    setFromValue(val);
    setToValue(convertValue(val, fromUnit, toUnit, category));
  };

  const handleToChange = (val: string) => {
    setToValue(val);
    setFromValue(convertValue(val, toUnit, fromUnit, category));
  };

  const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newCat = e.target.value as UnitCategory;
    const defaults = getCategoryDefaults(newCat);
    setCategory(newCat);
    setFromUnit(defaults.defaultFrom);
    setToUnit(defaults.defaultTo);
    setFromValue("1");
    setToValue(convertValue("1", defaults.defaultFrom, defaults.defaultTo, newCat));
  };

  const handleFromUnitChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newFrom = e.target.value;
    setFromUnit(newFrom);
    setToValue(convertValue(fromValue, newFrom, toUnit, category));
  };

  const handleToUnitChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newTo = e.target.value;
    setToUnit(newTo);
    setToValue(convertValue(fromValue, fromUnit, newTo, category));
  };

  const swapUnits = () => {
    const tempUnit = fromUnit;
    setFromUnit(toUnit);
    setToUnit(tempUnit);
    
    const tempVal = fromValue;
    setFromValue(toValue);
    setToValue(tempVal);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>{ui.cardTitle}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="category-select">{ui.labelCategory}</Label>
          <select
            id="category-select"
            value={category}
            onChange={handleCategoryChange}
            className="flex h-10 w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {categories.map((item) => (
              <option key={item} value={item}>
                {ui.categories[item]}
              </option>
            ))}
          </select>
        </div>

        <div className="grid gap-4 md:grid-cols-[1fr_auto_1fr] items-end">
          <div className="space-y-2">
            <Label htmlFor="from-input">{ui.labelFrom}</Label>
            <div className="flex gap-2">
              <Input
                id="from-input"
                type="number"
                value={fromValue}
                onChange={(e) => handleFromChange(e.target.value)}
              />
              <select
                value={fromUnit}
                onChange={handleFromUnitChange}
                className="flex h-10 w-32 items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
              >
                {getUnitOptions(category).map((unit) => (
                  <option key={unit.key} value={unit.key}>
                    {ui.units[unit.key]}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <Button
            type="button"
            variant="ghost"
            size="icon"
            onClick={swapUnits}
            className="mb-0.5"
            aria-label={ui.swap}
          >
            <ArrowLeftRight className="size-4" />
          </Button>

          <div className="space-y-2">
            <Label htmlFor="to-input">{ui.labelTo}</Label>
            <div className="flex gap-2">
              <Input
                id="to-input"
                type="number"
                value={toValue}
                onChange={(e) => handleToChange(e.target.value)}
              />
              <select
                value={toUnit}
                onChange={handleToUnitChange}
                className="flex h-10 w-32 items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
              >
                {getUnitOptions(category).map((unit) => (
                  <option key={unit.key} value={unit.key}>
                    {ui.units[unit.key]}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
