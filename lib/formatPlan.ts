export function formatPlanWithEmojis(markdown: string) {
  if (!markdown) return markdown;
  // basic replacements — expand as needed
  const rules: Array<[RegExp, string]> = [
    [/^#{3}\s*(Day \d+:)/gm, "💪 **$1**"],
    [/^##\s*WORKOUT PLAN/mg, "🏋️ **WORKOUT PLAN**"],
    [/^##\s*DIET PLAN/mg, "🥗 **DIET PLAN**"],
    [/^##\s*TIPS/mg, "💡 **TIPS**"],
    [/^#\s*SUMMARY/mg, "🔎 **SUMMARY**"],
    [/(\*\*Warm-Up:\*\*)/g, "🔥 Warm-Up:"],
    [/(\*\*Exercises:\*\*)/g, "🏋️ Exercises:"],
    [/(\*\*Cooldown:\*\*)/g, "🧘 Cooldown:"]
  ];

  let out = markdown;
  for (const [re, sub] of rules) out = out.replace(re, sub);

  // also convert markdown bold to strong tags for display <strong>
  out = out.replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>");
  // preserve line breaks as <br>
  out = out.replace(/\n/g, "<br/>");

  return out;
}
