import re

with open('src/components/SponsorsContent.tsx', 'r') as f:
    content = f.read()

# Add to arrays
gov_array = '''const supportedBy: Sponsor[] = [
  {
    logo: '/doa-rajasthan.png',
    name: 'Department of Agriculture',
    industry: 'Government of Rajasthan',
    website: 'https://agriculture.rajasthan.gov.in/',
    description: 'Empowering innovation in agriculture and agritech to solve real-world farming challenges.',
    tier: 'Supported By',
  },
];

const coPoweredBy: Sponsor[] = ['''

content = content.replace("const coPoweredBy: Sponsor[] = [", gov_array)

# Add to JSX
gov_jsx = '''        {/* ── Supported By Tier ─────────────────────────────────────────────── */}
        {supportedBy.length > 0 && (
          <div className="mb-20">
            <motion.div
              className="text-center mb-8 flex items-center justify-center gap-3"
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : {}}
              transition={{ delay: 0.1 }}
            >
              <ShieldCheck className="h-5 w-5 text-emerald-400" aria-hidden="true" />
              <h2 className="text-xl md:text-2xl font-bold tracking-tight text-white">
                Supported By
              </h2>
            </motion.div>
            
            <div className="flex justify-center">
              <div className="max-w-md w-full">
                {supportedBy.map((s, i) => (
                  <SponsorShowcaseCard
                    key={i}
                    sponsor={s}
                    delay={0.2}
                    isInView={isInView}
                  />
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ── Co-Powered By Tier ─────────────────────────────────────────────── */}'''

content = content.replace("{/* ── Co-Powered By Tier ─────────────────────────────────────────────── */}", gov_jsx)

with open('src/components/SponsorsContent.tsx', 'w') as f:
    f.write(content)
