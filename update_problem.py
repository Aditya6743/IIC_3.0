with open('src/components/ProblemStatementsContent.tsx', 'r') as f:
    content = f.read()

old_block = '''          <p className="text-gray-300 text-lg max-w-3xl mx-auto mb-8">
            Choose from cutting-edge problem statements across various technological
            domains. Each challenge is designed to push the boundaries of innovation
            and create real-world impact.
          </p>

          {/* Search Bar */}'''

new_block = '''          <p className="text-gray-300 text-lg max-w-3xl mx-auto mb-6">
            Choose from cutting-edge problem statements across various technological
            domains. Each challenge is designed to push the boundaries of innovation
            and create real-world impact.
          </p>

          {/* DOA Partner Logo */}
          <div className="flex flex-col items-center justify-center mb-10">
            <span className="text-xs uppercase tracking-widest text-emerald-400 font-semibold mb-3">Supported By</span>
            <div className="px-6 py-4 bg-white/5 border border-white/10 rounded-2xl backdrop-blur-sm">
              <img src="/doa-rajasthan.png" alt="Department of Agriculture, Government of Rajasthan" className="h-16 md:h-20 object-contain drop-shadow-[0_0_15px_rgba(255,255,255,0.2)]" />
            </div>
          </div>

          {/* Search Bar */}'''

content = content.replace(old_block, new_block)

with open('src/components/ProblemStatementsContent.tsx', 'w') as f:
    f.write(content)
