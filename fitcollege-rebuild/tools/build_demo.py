#!/usr/bin/env python3
"""Build lead-capture-demo.html: a self-contained demo with the real routing
data and router inlined. Run after build_advisor_routing.py.
Usage: python3 tools/build_demo.py <template.html>"""
import sys
from pathlib import Path
ROOT = Path(__file__).resolve().parent.parent
t = Path(sys.argv[1]).read_text(encoding="utf-8")
t = t.replace("/*__DATA__*/", (ROOT / "js" / "advisor-data.js").read_text(encoding="utf-8"))
t = t.replace("/*__ROUTER__*/", (ROOT / "js" / "advisor-router.js").read_text(encoding="utf-8"))
(ROOT / "lead-capture-demo.html").write_text(t, encoding="utf-8")
print("built lead-capture-demo.html", len(t) // 1024, "KB")
