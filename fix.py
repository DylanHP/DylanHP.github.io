with open("assets/css/bento.css", "r") as f:
    content = f.read()

# 1. Fix width: 100vw to width: 100% on body
content = content.replace("width: 100vw;", "width: 100%;")

# 2. Fix vh to dvh
content = content.replace("100vh", "100dvh")
content = content.replace("90vh", "90dvh")
content = content.replace("80vh", "80dvh")
content = content.replace("62vh", "62dvh")
content = content.replace("50vh", "50dvh")
content = content.replace("23vh", "23dvh")
content = content.replace("10vh", "10dvh")
content = content.replace("5vh", "5dvh")
content = content.replace("20vh", "20dvh")

# 3. Add -webkit-overflow-scrolling: touch
content = content.replace("overflow-y: auto;", "overflow-y: auto;\n  -webkit-overflow-scrolling: touch;")
content = content.replace("overflow: auto; /* Riattiva lo scroll su mobile */", "overflow: auto; /* Riattiva lo scroll su mobile */\n    -webkit-overflow-scrolling: touch;")

# 4. Fix long words overflowing
content = content.replace("line-height: 1.6;", "line-height: 1.6;\n  overflow-wrap: break-word;\n  word-wrap: break-word;")

# 5. Fix fake-terminal on mobile to scroll correctly
import re
# We want to replace `#fake-terminal { \n height: auto !important;` with `height: 100% !important;`
# But only for fake-terminal
content = re.sub(
    r'(#fake-terminal\s*\{\s*)height:\s*auto\s*!important;',
    r'\1height: 100% !important;\n    overflow-y: auto !important;',
    content
)

with open("assets/css/bento.css", "w") as f:
    f.write(content)
