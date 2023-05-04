import React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { useRouter } from "next/router";

export default function SearchDialog({
  open,
  handleClose,
  result,
  text,
}) {
  const router = useRouter();
  const openFound = () => {
    handleClose();
    router.replace(
      `/${result?.categoryEn}/${result?.subCategoryEn}/${result?._id}`
    );
  };
  return (
    <>
      <Dialog
        open={open}
        onClose={handleClose}
        scroll={"paper"}
        aria-labelledby="scroll-dialog-title"
        aria-describedby="scroll-dialog-description"
      >
        <DialogTitle id="scroll-dialog-title">Результат</DialogTitle>
        <DialogContent>
          <DialogContentText
            id="scroll-dialog-description"
            style={{ minWidth: "400px", minHeight: "100px" }}
          >
            {result ? (
              <>
                <span>{result?.title}</span>
                <br />
                <span>{result?.category}</span>
                <br />
                <span>{result?.subCategory}</span>
                <br />
                <span>{result?.description}</span>
                <br />
                <Button
                  size="small"
                  color="primary"
                  onClick={() => openFound()}
                >
                  Подробнее
                </Button>
              </>
            ) : (
              `${text} не найден`
            )}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Закрыть</Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
