import { useState } from "react";
import { ArrowLeft, Plus, Search, Eye, Edit, Trash2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { establishments } from "@/data/establishmentsData";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export default function EstablishmentManagement() {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<"all" | "active" | "inactive">("all");

  // Filter establishments based on search and status
  const filteredEstablishments = establishments.filter((est) => {
    const matchesSearch =
      est.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      est.type.toLowerCase().includes(searchTerm.toLowerCase()) ||
      est.address.neighborhood.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus =
      statusFilter === "all" ||
      (statusFilter === "active" && est.active) ||
      (statusFilter === "inactive" && !est.active);

    return matchesSearch && matchesStatus;
  });

  // Count active and inactive establishments
  const activeCount = establishments.filter((e) => e.active).length;
  const inactiveCount = establishments.filter((e) => !e.active).length;

  // Format date to DD/MM/YYYY
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50 py-12 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <Button
            variant="ghost"
            onClick={() => navigate(-1)}
            className="mb-4 text-slate-600 hover:text-white hover:bg-orange-500"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Voltar
          </Button>

          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-4xl font-bold text-slate-900 mb-2">
                Gerenciar Estabelecimentos
              </h1>
              <p className="text-slate-600">
                Visualize e edite os estabelecimentos cadastrados
              </p>
            </div>
            <Button className="bg-orange-500 hover:bg-orange-600 text-white">
              <Plus className="h-4 w-4 mr-2" />
              Novo Estabelecimento
            </Button>
          </div>
        </div>

        {/* Search and Filters */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400" />
              <Input
                type="text"
                placeholder="Buscar por nome, tipo ou bairro..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>

            <div className="flex gap-2">
              <Button
                variant={statusFilter === "active" ? "default" : "outline"}
                onClick={() =>
                  setStatusFilter(statusFilter === "active" ? "all" : "active")
                }
                className={
                  statusFilter === "active"
                    ? "bg-orange-500 hover:bg-orange-600"
                    : ""
                }
              >
                {activeCount} Ativos
              </Button>
              <Button
                variant={statusFilter === "inactive" ? "default" : "outline"}
                onClick={() =>
                  setStatusFilter(statusFilter === "inactive" ? "all" : "inactive")
                }
                className={
                  statusFilter === "inactive"
                    ? "bg-blue-500 hover:bg-blue-600"
                    : ""
                }
              >
                {inactiveCount} Inativos
              </Button>
            </div>
          </div>
        </div>

        {/* Table */}
        <div className="bg-white rounded-lg shadow-sm overflow-hidden">
          <div className="p-6 border-b">
            <h2 className="text-xl font-semibold text-slate-900">
              Estabelecimentos Cadastrados
            </h2>
            <p className="text-sm text-slate-600 mt-1">
              Total de {filteredEstablishments.length} estabelecimento
              {filteredEstablishments.length !== 1 ? "s" : ""} encontrado
              {filteredEstablishments.length !== 1 ? "s" : ""}
            </p>
          </div>

          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Nome</TableHead>
                  <TableHead>Tipo</TableHead>
                  <TableHead>Bairro</TableHead>
                  <TableHead>Responsável</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Data Cadastro</TableHead>
                  <TableHead className="text-right">Ações</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredEstablishments.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={7} className="text-center text-slate-500 py-8">
                      Nenhum estabelecimento encontrado
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredEstablishments.map((establishment) => (
                    <TableRow key={establishment.id}>
                      <TableCell className="font-medium">
                        {establishment.name}
                      </TableCell>
                      <TableCell>{establishment.type}</TableCell>
                      <TableCell>{establishment.address.neighborhood}</TableCell>
                      <TableCell>{establishment.responsible || "N/A"}</TableCell>
                      <TableCell>
                        <Badge
                          variant={establishment.active ? "default" : "secondary"}
                          className={
                            establishment.active
                              ? "bg-orange-500 hover:bg-orange-600"
                              : "bg-blue-500 hover:bg-blue-600"
                          }
                        >
                          {establishment.active ? "Ativo" : "Inativo"}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        {formatDate(establishment.registrationDate)}
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center justify-end gap-2">
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8 text-slate-600 hover:text-slate-900"
                            onClick={() => navigate(`/estabelecimentos/${establishment.id}`)}
                            title="Visualizar"
                          >
                            <Eye className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8 text-slate-600 hover:text-slate-900"
                            title="Editar"
                          >
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8 text-red-600 hover:text-red-900"
                            title="Excluir"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>
        </div>
      </div>
    </div>
  );
}
