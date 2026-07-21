import { useState } from "react";
import { motion } from "framer-motion";
import {
  Settings as SettingsIcon,
  Moon,
  Sun,
  Cpu,
  Database,
  Server,
  Trash2,
  CheckCircle2,
} from "lucide-react";
import DashboardLayout from "../components/layout/DashboardLayout";
import Card from "../components/common/Card";
import Button from "../components/common/Button";
import Input from "../components/common/Input";
import { useTheme } from "../hooks/useTheme";
import { useChat } from "../context/ChatContext";
import toast from "../utils/toast";

function SettingRow({ label, description, children }) {
  return (
    <div className="flex items-center justify-between gap-6 py-3.5 border-b border-border last:border-0">
      <div className="min-w-0">
        <p className="text-sm font-medium text-fg">{label}</p>
        {description && <p className="text-xs text-fg-dim mt-0.5">{description}</p>}
      </div>
      <div className="shrink-0">{children}</div>
    </div>
  );
}

function SectionHeader({ icon: Icon, title }) {
  return (
    <div className="flex items-center gap-2.5 mb-3">
      <div className="w-7 h-7 rounded-lg bg-glow flex items-center justify-center text-fg">
        <Icon size={14} />
      </div>
      <h2 className="text-sm font-semibold text-fg">{title}</h2>
    </div>
  );
}

function Settings() {
  const { isDark, toggleTheme } = useTheme();
  const { clearAllHistory } = useChat();

  const [backendUrl, setBackendUrl] = useState("http://localhost:8081");
  const [llmModel, setLlmModel] = useState("llama3.2:1b");
  const [embedModel, setEmbedModel] = useState("all-minilm");
  const [topK, setTopK] = useState("5");
  const [saved, setSaved] = useState(false);

  const handleSave = () => {
    setSaved(true);
    toast.success("Settings saved.");
    setTimeout(() => setSaved(false), 2500);
  };

  return (
    <DashboardLayout>
      <div className="max-w-xl mx-auto">

        {/* Header */}
        <motion.div initial={{ opacity: 0, y: -4 }} animate={{ opacity: 1, y: 0 }}>
          <h1 className="text-xl font-bold text-fg flex items-center gap-2">
            <SettingsIcon size={18} />
            Settings
          </h1>
          <p className="text-sm text-fg-dim mt-1">
            Manage your preferences and AI configuration.
          </p>
        </motion.div>

        <div className="mt-6 space-y-4">

          {/* Appearance */}
          <motion.div initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.05 }}>
            <Card className="p-5">
              <SectionHeader icon={isDark ? Moon : Sun} title="Appearance" />
              <SettingRow
                label="Theme"
                description="Choose between dark and light interface"
              >
                <div className="flex items-center gap-1 rounded-lg border border-border bg-glow p-0.5">
                  <button
                     onClick={toggleTheme}
                     className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-medium transition-all ${
                       isDark
                         ? "bg-fg text-base"
                         : "text-fg-dim hover:text-fg"
                     }`}
                   >
                     <Moon size={12} /> Dark
                   </button>
                   <button
                     onClick={toggleTheme}
                     className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-medium transition-all ${
                       !isDark
                         ? "bg-base text-fg"
                         : "text-fg-dim hover:text-fg"
                     }`}
                   >
                     <Sun size={12} /> Light
                   </button>
                </div>
              </SettingRow>
            </Card>
          </motion.div>

          {/* AI Configuration */}
          <motion.div initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
            <Card className="p-5">
              <SectionHeader icon={Cpu} title="AI Configuration" />
              <div className="space-y-3">
                <Input
                  label="LLM Model"
                  value={llmModel}
                  onChange={(e) => setLlmModel(e.target.value)}
                  hint="Ollama model name (e.g. llama3.2:1b, mistral)"
                />
                <Input
                  label="Embedding Model"
                  value={embedModel}
                  onChange={(e) => setEmbedModel(e.target.value)}
                  hint="Used for vector embeddings (e.g. all-minilm)"
                />
                <Input
                  label="Top-K Results"
                  type="number"
                  min={1}
                  max={20}
                  value={topK}
                  onChange={(e) => setTopK(e.target.value)}
                  hint="Number of document chunks retrieved per query"
                />
              </div>
            </Card>
          </motion.div>

          {/* API Configuration */}
          <motion.div initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }}>
            <Card className="p-5">
              <SectionHeader icon={Server} title="API Configuration" />
              <Input
                label="Backend URL"
                value={backendUrl}
                onChange={(e) => setBackendUrl(e.target.value)}
                hint="Spring Boot server URL"
              />
              <div className="mt-4 flex justify-end">
                <Button
                  onClick={handleSave}
                  icon={saved ? CheckCircle2 : undefined}
                  variant={saved ? "secondary" : "primary"}
                  size="sm"
                >
                  {saved ? "Saved!" : "Save Changes"}
                </Button>
              </div>
            </Card>
          </motion.div>

          {/* Danger Zone */}
          <motion.div initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
            <Card className="p-5 border-danger/20">
              <SectionHeader icon={Trash2} title="Danger Zone" />
              <SettingRow
                label="Clear Chat History"
                description="Permanently delete all chat messages and history from the database."
              >
                <Button
                  variant="danger"
                  size="sm"
                  icon={Trash2}
                  onClick={clearAllHistory}
                >
                  Clear History
                </Button>
              </SettingRow>
            </Card>
          </motion.div>

          {/* About */}
          <motion.div initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.25 }}>
            <Card className="p-5">
              <SectionHeader icon={Database} title="About" />
              <div className="space-y-2 text-xs text-fg-dim">
                <div className="flex justify-between">
                  <span>Stack</span>
                  <span className="text-fg-dim">Spring Boot 3.5 · React 19 · Tailwind v4</span>
                </div>
                <div className="flex justify-between">
                  <span>AI Engine</span>
                  <span className="text-fg-dim">Ollama · Spring AI 1.0</span>
                </div>
                <div className="flex justify-between">
                  <span>Vector Store</span>
                  <span className="text-fg-dim">ChromaDB</span>
                </div>
                <div className="flex justify-between">
                  <span>Version</span>
                  <span className="text-fg-dim">1.0.0</span>
                </div>
              </div>
            </Card>
          </motion.div>

        </div>
      </div>
    </DashboardLayout>
  );
}

export default Settings;
