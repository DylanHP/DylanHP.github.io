with open("index.html", "r") as f:
    html = f.read()

# I will extract the blocks for the three items and then replace the whole block
start_marker = "<li>\n            <button\n              class=\"icon terminal-btn logo nav-btn\""
end_marker = "            </button>\n          </li>\n        </ul>"

start_idx = html.find(start_marker)
end_idx = html.find(end_marker) + len(end_marker)

old_block = html[start_idx:end_idx]

terminal = """<li>
            <button
              class="icon terminal-btn logo nav-btn"
              data-target="terminal-box"
            >
              <i class="fa-solid fa-terminal"></i>
            </button>
          </li>"""

gift = """<li>
            <button
              class="icon secret-btn logo nav-btn"
              data-target="rickrolled"
            >
              <i class="fa-solid fa-gift"></i>
            </button>
          </li>"""

theme = """<li>
            <button
              class="icon theme-btn logo"
              id="theme-toggle"
              title="Toggle Dark/Light Theme"
            >
              <i class="fa-solid fa-moon"></i>
            </button>
          </li>"""

new_block = theme + "\n          " + gift + "\n          " + terminal + "\n        </ul>"

if start_idx != -1:
    new_html = html[:start_idx] + new_block + html[end_idx:]
    with open("index.html", "w") as f:
        f.write(new_html)
    print("Reordered successfully!")
else:
    print("Could not find the block")

