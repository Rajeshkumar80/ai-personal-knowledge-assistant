import { useState } from "react";
import { motion } from "framer-motion";
import {
  Settings as SettingsIcon,
  Moon,
  Sun,
  Cpu,
  Database,
  Server,
  User,
  Trash2,
  ChevronRight,
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
    <div className="flex items-start justify-between gap-6 py-4 border-b border-white/6 last:border-0">
      <div className="min-w-0">
        <p className="text-sm font-medium text-slate-200">{label}</p>
        {description && <p className="text-xs text-slate-500 mt-0.5">{description}</p>}
      </div>
      <div className="shrink-0">{children}</div>
    </div>
  );
}

function SectionHeader({ icon: Icon, title }) {
  return (
    <div className="flex items-center gap-2.5 mb-4">
      <div className="w-8 h-8 rounded-xl bg-indigo-500/15 border border-indigo-500/20 flex items-center justify-center text-indigo-400">
        <Icon size={15} />
      </div>
      <h2 className="text-sm font-semibold text-slate-200">{title}</h2>
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
    // In a real app these would persist to backend/localStorage
    setSaved(true);
    toast.success("Settings saved.");
    setTimeout(() => setSaved(false), 2500);
  };

  return (
    <DashboardLayout>
      <div className="max-w-2xl mx-auto space-y-8">

        {/* Header */}
        <motion.div initial={{ opacity: 0, y: -6 }} animate={{ opacity: 1, y: 0 }}>
          <h1 className="text-2xl font-bold text-slate-100 flex items-center gap-2">
            <SettingsIcon size={22} className="text-indigo-400" />
            Settings
          </h1>
          <p className="text-sm text-slate-500 mt-1">
            Manage your preferences and AI configuration.
          </p>
        </motion.div>

        {/* Appearance */}
        <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.05 }}>
          <Card className="p-6">
            <SectionHeader icon={Moon} title="Appearance" />
            <SettingRow
              label="Theme"
              description="Choose between dark and light interface"
            >
              <div className="flex items-center gap-2 rounded-xl border border-white/10 bg-white/4 p-1">
                <button
                  onClick={() => !isDark && toggleTheme()}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                    isDark
                      ? "bg-indigo-600 text-white shadow-lg"
                      : "text-slate-400 hover:text-slate-200"
                  }`}
                >
                  <Moon size={12} /> Dark
                </button>
                <button
                  onClick={() => isDark && toggleTheme()}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                    !isDark
                      ? "bg-indigo-600 text-white shadow-lg"
                      : "text-slate-400 hover:text-slate-200"
                  }`}
                >
                  <Sun size={12} /> Light
                </button>
              </div>
            </SettingRow>
          </Card>
        </motion.div>

        {/* AI Model */}
        <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
          <Card className="p-6">
            <SectionHeader icon={Cpu} title="AI Configuration" />
            <div className="space-y-4">
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

        {/* API */}
        <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }}>
          <Card className="p-6">
            <SectionHeader icon={Server} title="API Configuration" />
            <Input
              label="Backend URL"
              value={backendUrl}
              onChange={(e) => setBackendUrl(e.target.value)}
              hint="Spring Boot server URL"
            />
            <div className="mt-5 flex justify-end">
              <Button
                onClick={handleSave}
                icon={saved ? CheckCircle2 : undefined}
                variant={saved ? "secondary" : "primary"}
              >
                {saved ? "Saved!" : "Save Changes"}
              </Button>
            </div>
          </Card>
        </motion.div>

        {/* Danger zone */}
        <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
          <Card className="p-6 border-red-500/20">
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
        <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.25 }}>
          <Card className="p-6">
            <SectionHeader icon={Database} title="About" />
            <div className="space-y-2 text-xs text-slate-500">
              <div className="flex justify-between">
                <span>Stack</span>
                <span className="text-slate-400">Spring Boot 3.5 · React 19 · Tailwind v4</span>
              </div>
              <div className="flex justify-between">
                <span>AI Engine</span>
                <span className="text-slate-400">Ollama · Spring AI 1.0</span>
              </div>
              <div className="flex justify-between">
                <span>Vector Store</span>
                <span className="text-slate-400">ChromaDB</span>
              </div>
              <div className="flex justify-between">
                <span>Version</span>
                <span className="text-slate-400">1.0.0</span>
              </div>
            </div>
          </Card>
        </motion.div>

      </div>
    </DashboardLayout>
  );
}

export default Settings;
